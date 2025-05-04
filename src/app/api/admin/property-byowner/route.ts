import { createResponse } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = await verifyTkn(req);
  if (auth instanceof NextResponse) {
    return auth;
  }
  try {
    const ownerName = req.nextUrl.searchParams.get("ownerName");

    if (!ownerName) {
      return createResponse("Provide appropriate owner name", false, 400);
    }

    const property = await Property.find({status:'available',
      "owner.name": { $regex: ownerName, $options: "i" },
    });

    if (property.length === 0) {
      return createResponse("No property found with this owner", true, 200, []);
    }

    return createResponse(
      `Fetched properties associated with owner:${ownerName}`,
      true,
      200,
      property
    );
  } catch (error: any) {
    console.error(error.message);
    return createResponse(`Error:${error.message}`, false, 500, []);
  }
}
