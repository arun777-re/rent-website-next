import { dbConnect } from "@/lib/db";
import { createResponse } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import Property from "@/models/Property";
import UserInteraction from "@/models/UserInterAction";
import userInteraction from "@/models/UserInterAction";
import { NextRequest, NextResponse } from "next/server";
dbConnect()


interface LeanProps{
    location:string;
    category:string;
}

interface CustomReq extends NextRequest{
    user?:any
}


export async function POST(req:CustomReq,res:NextResponse){
    await verifyUserToken(req,res);
    try {
        const {userId} = req.user;
        console.log("userId",userId);
        const {type,propertyId} = await req.json();

        if(!propertyId || !["click","view"].includes(type)){
            return createResponse('Provide an appropriate propertyId and type of interaction',false,400);
        }

        const property = await Property.findById(propertyId).lean<LeanProps>();
        if(!property){
            return createResponse('No such Property exists',false,400);
        }

     const {location,category} = property;
        
         await userInteraction.findOneAndUpdate({userId,location,category,type},{
            $inc:{count:1}
         },{upsert:true,new:true,setDefaultsOnInsert:true})

        return createResponse('User Interaction Stored succesfully',true,201);

    } catch (error:any) {
        console.error("Error during get search Property", error.message);
    return createResponse(`${error.message}`, false, 500);
    }
}



// api to show users interactions or last activity
export async function GET(req:CustomReq,res:NextResponse){
    await verifyUserToken(req,res);
try {
    const {userId} = req.user;
    const lastActivity = await UserInteraction.find({userId}).sort({createdAt:-1}).limit(10);
    if(lastActivity.length === 0){
        return createResponse('No activity to show',true,200,[]);
    }
    return createResponse(`Last Activity of ${req.user.firstName}`,true,200,lastActivity)
} catch (error:any) {
    console.error("Error during get search Property", error.message);
    return createResponse(`${error.message}`, false, 500);
}
}