import { createResponse } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req:NextRequest){
    const auth = await verifyTkn(req);
    if(auth instanceof NextResponse){
        return auth;
    }
    try {
        const status = req.nextUrl.searchParams.get('status');
        const propertyId = req.nextUrl.searchParams.get('propertyId');
        if(!status){
            return createResponse('Provide appropriate status',false,400);
        }

        const updated = await Property.findByIdAndUpdate(propertyId,{status},{new:true});

        if(!updated){
             return createResponse('Property Not Found',false,400);
        }
        return createResponse('updated successfully',true,200,[]);
    } catch (error:any) {
        console.error(error.message);
        return createResponse(`Error:${error.message}`, false, 500, []);
    }
}