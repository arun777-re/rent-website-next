import Notification from "@/models/Notification";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { createResponse, verifyAccess } from "@/lib/middleware/error";
import Pusher from "pusher";

dbConnect();

const appId = process.env.PUSHER_APP_ID || '';
  const key = process.env.PUSHER_APP_KEY || '';
  const secret = process.env.PUSHER_APP_SECRET || '';
  const cluster = process.env.PUSHER_CLUSTER || '';

interface CustomReq extends NextRequest{
  user:{string:any}
}

export async function POST(req:CustomReq,res:NextResponse){
const authResult = await verifyAccess(req,res);
if(authResult instanceof NextResponse){
  return authResult;
}
    try {
        const {title,message,type='info'} =await req.json();
        if (!title || !message) {
          return createResponse("Title and message are required", false, 400);
        }
        const activeUsers = await User.find({isActive:true}).lean();

        const notifications = activeUsers.map((user:any) => ({
            userId:user._id,
            title,message,
            type,
            isRead:false,
        }));

        await Notification.insertMany(notifications);

        // trigger realtime notification via pusher
        const pusher = new Pusher({
            appId:appId,
            secret:secret,
            key:key,
            cluster:cluster,
            useTLS: true,
          });
        
          await Promise.all(
            activeUsers.map(user =>
              pusher.trigger((user._id as string).toString(), 'new-notification', {
                title,
                message,
                type,
                timestamp: new Date().toISOString(),
              })
            )
          );
          
      

    return createResponse('Message sent to all active users',true,201);

    } catch (error:any) {
      console.error("Error during get search Property", error.message);
      return createResponse(`${error.message}`, false, 500);
    }
}