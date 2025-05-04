import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import Notification from "@/models/Notification";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function PATCH(req: NextRequest, res: NextResponse) {
  const auth = await verifyUserToken(req, res);
  if (auth instanceof NextResponse) {
    return auth;
  }
  try {
    const notificationId = req.nextUrl.searchParams.get("propertyId");
    if (!notificationId) {
      return createResponse("Provide an appropriate propertyId", false, 400);
    }

    const updated = await Notification.findByIdAndUpdate(
      notificationId,
      {
        isRead: true,
      },
      { new: true }
    ).lean();

    if (!updated) {
      return createResponse("No such notification found", false, 400);
    }

    return createResponse("Notification Updated successfully", true, 200);
  } catch (error: any) {
    console.error("Failed to update notification:", error.message);
    return createResponse(`Error: ${error.message}`, false, 500);
  }
}
