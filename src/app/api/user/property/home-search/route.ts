import Property from "@/models/Property";
import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { verifyTkn, verifyUserToken } from "@/lib/middleware/verifyToken";
import { createResponse, paginationFunc, verifyAccess } from "@/lib/middleware/error";



dbConnect();

// this api is used to get property based on location search
export async function GET(req:NextRequest,res:NextResponse){
  await verifyAccess(req,res);
    try {
        const location = req.nextUrl.searchParams.get("location");
        if(!location){
            return createResponse("Provide appropriate location to search",false,400);
        }

        const filter = {location:{$regex:location,$options:"i"}}

        const {page,limit,skip,totalPages} = await paginationFunc(req.nextUrl.searchParams,Property,filter);

        const properties = await Property.find(filter)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);
        if(properties.length === 0){
            return createResponse("No Property to Show on this location",true,200,[]);
        }

       
        return createResponse(`Fetched Property for ${location}`,true,200,properties,totalPages);

    } catch (error:any) {
         console.error("Error during get search Property", error.message);
            return createResponse(`${error.message}`, false, 500);
    }
}


