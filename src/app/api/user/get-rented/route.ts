import { dbConnect } from "@/lib/db";
import { createResponse, paginationFunc, verifyAccess } from "@/lib/middleware/error";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
dbConnect()



// api to get all rented properties
export async function GET(req:NextRequest,res:NextResponse){
    const authResult = await verifyAccess(req,res);
     if(authResult instanceof NextResponse){
       return authResult;
     }
try {
    const filter = {
        status:'rented'
    }
    const {totalItems,skip,totalPages,limit} = await paginationFunc(req.nextUrl.searchParams,Property,filter);
    const properties = await Property.find(filter).sort({createdAt:-1}).skip(skip).limit(limit);
    if(properties.length === 0){
        return createResponse('No available Properties to show',true,200,[])
    }

    return createResponse('Fetched rented Properties are',true,200,properties,totalPages,totalItems)
} catch (error:any) {
    console.error(error.message);
    return createResponse(`Internal Server Error:${error.message}`,false,500)
}
}