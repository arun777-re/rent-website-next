import { createResponse } from "@/lib/middleware/error";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
dbConnect();

export async function GET(req: NextRequest) {
  try {
    const featuredProperties = await Property.find({
      featured: true,
      status:'available'
    })
      .sort({ createdAt: -1 })
      .limit(12);
    if (featuredProperties.length === 0) {
      return createResponse("No Featured Property to show", true, 200, []);
    }

    const res = createResponse(
      "Recommended Featured Properties are:",
      true,
      200,
      featuredProperties
    );
    res.headers.set('Cache-Control','s-maxage=60,stale-while-revalidate');
    return res;
  } catch (error: any) {
    console.error("Error during get search Property", error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}
