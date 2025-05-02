import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


dbConnect()

interface CustomReq extends NextRequest{
    user?:any
}
export async function GET(req:CustomReq,res:NextResponse){
    await verifyUserToken(req,res);
   try {

  const id = req.user._id;

  const user = await User.findById(id).select('-password');
   
  if(!user){
    return createResponse('No such User Exists',false,400)
  }

  return createResponse('Fetching User Successfull',true,200,user)

   } catch (error:any) {
    console.error("Error during get user",error.message);
    return createResponse(`Internal Server Error:${error.message}`,false,500)
   }
}