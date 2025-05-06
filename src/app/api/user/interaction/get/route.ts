import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import UserInteraction from "@/models/UserInterAction";
import { NextRequest, NextResponse } from "next/server";
dbConnect();


interface CustomReq extends NextRequest {
  user?: any;
}

// api to show users interactions or last activity
export async function GET(req: CustomReq, res: NextResponse) {
  const auth = await verifyUserToken(req, res);
  if(auth instanceof NextResponse){
    return auth;
  }
  try {
    const userId = req.user.id;
    const lastActivity = await UserInteraction.find({ userId }).
    populate('propertyId','title slug')
      .sort({ createdAt: -1 })
      .limit(10);
    if (lastActivity.length === 0) {
      return createResponse("No activity to show", true, 200, []);
    }
    return createResponse(
      `Last Activity of ${req.user.firstName}`,
      true,
      200,
      lastActivity
    );
  } catch (error: any) {
    console.error("Error during get search Property", error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}
