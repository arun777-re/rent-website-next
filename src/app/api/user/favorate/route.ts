import { dbConnect } from "@/lib/db";
import { createResponse, handleValidation } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import Favorite from "@/models/Favorate";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

interface CustomReq extends NextRequest {
  user?: any;
}
export async function POST(req: CustomReq, res: NextResponse) {
  await verifyUserToken(req, res);
  try {
    const userId = req.user.id;

    // get query params from url
    const { searchParams } = new URL(req.url);

    const propertyId = searchParams.get("propertyId");
    // handlevalidation for both
    handleValidation({
      userId,
      propertyId,
    });
    const createFavorate = new Favorite({
      userId,
      propertyId,
    });

    await createFavorate.save();
    return createResponse("Added property to favorite list", true, 200);
  } catch (error: any) {
    console.error(error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}

// getting all the favorite property associated with a user
export async function GET(req: CustomReq, res: NextResponse) {
  await verifyUserToken(req, res);
  try {
    const userId = req.user.id;
    // for pagination
    const pageParams: any = req.nextUrl.searchParams.get("page");
    const limitParams: any = req.nextUrl.searchParams.get("limit");
    const page = parseInt(pageParams) || 1;
    const limit = parseInt(limitParams) || 10;
    const skip = (page - 1) * limit;

    const properties = await Favorite.find({ userId })
      .populate("propertyId")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (properties.length === 0) {
      return createResponse("No Favorate Property to show", true, 200, []);
    }

    const totalProperties = await Favorite.countDocuments();
    const totalPages = Math.ceil(totalProperties / limit);

    return createResponse(
      "Fetch favorite property successfull",
      true,
      200,
      properties,
      totalPages
    );
  } catch (error: any) {
    console.error(error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}
