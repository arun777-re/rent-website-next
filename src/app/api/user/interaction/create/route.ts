import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import Property from "@/models/Property";
import UserInteraction from "@/models/UserInterAction";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

interface CustomReq extends NextRequest {
  user?: any;
}

export async function POST(req: CustomReq, res: NextResponse) {
  const authResult = await verifyUserToken(req, res);
  if (authResult instanceof NextResponse) return authResult;
  try {
    const userId = req.user._id;
    const { type, propertyId } = await req.json();

    if (!propertyId || !["click", "view"].includes(type)) {
      return createResponse(
        "Provide an appropriate propertyId and type of interaction",
        false,
        400
      );
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return createResponse("No such Property exists", false, 400);
    }

    const category = property.category;

    await UserInteraction.findOneAndUpdate(
      { userId, category, type, propertyId },
      {
        $inc: { count: 1 },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return createResponse("User Interaction Stored succesfully", true, 201);
  } catch (error: any) {
    console.error("Error during create userInteraction", error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}
