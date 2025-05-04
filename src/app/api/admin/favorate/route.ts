import { createResponse, paginationFunc } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import Favorite from "@/models/Favorate";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

// api to get favorate property
export async function GET(req: NextRequest) {
  const authResult = await verifyTkn(req);
  if (authResult instanceof NextResponse) return authResult;

  try {
    // get date for 7 days ago
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // filter
    const filter = {
      createdAt: { $gte: oneWeekAgo },
    };

    const { skip, totalItems, totalPages, limit } = await paginationFunc(
      req.nextUrl.searchParams,
      Favorite,
      filter
    );

    const favorate = await Favorite.find()
      .sort({ createdAt: -1 })
      .populate("userId", "firstName lastName email phone")
      .populate("propertyId",'slug  price address owner')
      .skip(skip)
      .limit(limit);

    if (favorate.length === 0) {
      return createResponse(
        "No Favorate Property available",
        true,
        200,
        [],
        0,
        0
      );
    }
    return createResponse(
      "Fetched Favorate Property are",
      true,
      200,
      favorate,
      totalPages,
      totalItems
    );
  } catch (error: any) {
    console.error(error.message);
    return createResponse(
      `Internal Server Error:${error.message}`,
      true,
      200,
      [],
      0,
      0
    );
  }
}
