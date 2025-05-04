import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

dbConnect();
// api to get total revenue
export async function GET(req: NextRequest) {
  const authResult = await verifyTkn(req);
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  try {
    const soldItems = await Property.find({ status: "sold" });
    if (soldItems.length === 0) {
      return createResponse("No Property sold yet", true, 200, [], 0, 0);
    }

    const totalRevenue = soldItems.reduce((sum, property) => {
      return sum + (property.price || 0);
    });

    return createResponse(
      "Total revenue fetched successfully",
      true,
      200,
      soldItems,
      soldItems.length,
      totalRevenue
    );
  } catch (error: any) {
    console.error(error.message);
    return createResponse(
      `Internal Server Error:${error.message}`,
      false,
      500,
      [],
      0,
      0
    );
  }
}
