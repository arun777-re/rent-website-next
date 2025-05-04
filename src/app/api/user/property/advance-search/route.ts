import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import {
  createResponse,
  paginationFunc,
  verifyAccess,
} from "@/lib/middleware/error";
dbConnect();

interface bodyProps {
  title?: string;
  location?: string;
  price?: number | string;
  category?: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  const auth = await verifyAccess(req, res);
  if (auth instanceof NextResponse) {
    return auth;
  }
  try {
    const body: bodyProps = await req.json();
    if (!body) {
      return createResponse("Provide at least one Parameter", false, 400);
    }
    const title = body.title;
    const category = body.category;
    const price = body.price;
    const location = body.location;

    const query: Record<string, any> = {};

    if (title) query.title = { $regex: title, $options: "i" };
    if (category) query.category = category;
    if (price) query.price = { $gte: Number(price) };
    if (location) query.location = { $regex: location, $options: "i" };
    if (Object.keys(query).length === 0) {
      return createResponse("Provide atleast one search parameter", false, 400);
    }

    const { skip, totalPages, limit } = await paginationFunc(
      req.nextUrl.searchParams,
      Property,
      query
    );

    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (properties.length === 0) {
      return createResponse("No Property to show", true, 200, []);
    }

    return createResponse(
      `Fetched property based on search are:`,
      true,
      200,
      properties,
      totalPages
    );
  } catch (error: any) {
    console.error("Error during get search Property", error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}
