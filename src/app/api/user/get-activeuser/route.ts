import { createResponse } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req:NextRequest){
    const authResult = await verifyTkn(req);
    if(authResult instanceof NextResponse){
        return authResult;
    }
    try {
        const activeUsers = await User.find({isActive:true}).lean();

        if(activeUsers.length === 0){
            return createResponse('No Active Users',true,200,[],0,0)
        }
       
        const totalActiveUsers = activeUsers.length;

        return createResponse('Fetched active users are:',true,200,activeUsers,0,totalActiveUsers)

    } catch (error:any) {
        console.error(error.message);
        return createResponse(`Internal Server Error:${error.message}`,false,500,[],0,0);
    }
}