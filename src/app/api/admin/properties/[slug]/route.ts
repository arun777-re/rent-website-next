import { dbConnect } from "@/lib/db";
import { createResponse, verifyAccess } from "@/lib/middleware/error";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

// find a particular property
export async function GET(
  req: NextRequest,
  context: { params: { slug: string } },
  res: NextResponse
) {
  let user = null;
  try {
    const auth = await verifyAccess(req, res);
    if (auth instanceof NextResponse) {
      user = auth;
      return user;
    }
  } catch {
    user = null;
  }

  try {
    const { slug } = await context.params;
    console.log("slug", slug);
    if (!slug) {
      return createResponse("Missing property slug", false, 400);
    }
    const property = await Property.findOne({ slug });
    if (!property) {
      return createResponse("No such Property exists", true, 200, []);
    }
    console.log(property);
    return createResponse("fetch property successfull", true, 200, property);
  } catch (error: any) {
    console.error(error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}
