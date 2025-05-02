import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/error";
import { verifyTkn} from "@/lib/middleware/verifyToken";
import Agent from "@/models/AgentSchema";
import { NextRequest, NextResponse } from "next/server";


dbConnect()

interface CustomReq extends NextRequest{
    admin?:any
}
export async function GET(req:CustomReq,res:NextResponse){
    const tokenResult = await verifyTkn(req);
    if(tokenResult instanceof NextResponse){
      return tokenResult;
    }
   try {

  const id = req.admin._id;

  const user = await Agent.findById(id).select('-password');
   
  if(!user){
    return createResponse('No such User Exists',false,400)
  }

  return createResponse('Fetching User Successfull',true,200,user)

   } catch (error:any) {
    console.error("Error during get user",error.message);
    return createResponse(`Internal Server Error:${error.message}`,false,500)
   }
}