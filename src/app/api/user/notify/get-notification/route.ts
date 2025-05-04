import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import Notification from "@/models/Notification";
import { NextRequest, NextResponse } from "next/server";
dbConnect();

// get all notification of before 7 days
export async function GET(req: NextRequest, res: NextResponse) {
  const auth = await verifyUserToken(req, res);
  if (auth instanceof NextResponse) return auth;
  try {
    const oldDate = new Date();
    oldDate.setDate(oldDate.getDate() - 7);

    const notification = await Notification.find({
      createdAt: { $gte: oldDate },
    }).sort({ createdAt: -1 });

    if (notification.length === 0) {
      return createResponse("No Notification", true, 200, [], 0, 0);
    }

    
    return createResponse(
      "All Notification are:",
      true,
      200,
      notification,
      0,
      0
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
