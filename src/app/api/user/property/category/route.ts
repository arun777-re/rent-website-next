import { createResponse } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
dbConnect();


// api to get properties by category
export async function GET(req:NextRequest,res:NextResponse){
    await verifyUserToken(req,res);
    try {
        const pageParams:any = req.nextUrl.searchParams.get('page');
        const limitParams:any = req.nextUrl.searchParams.get('limit');

        const page = parseInt(pageParams) || 1;
        const limit = parseInt(limitParams) || 10;
        const skip = (page-1) * limit;
        
        const category = req.nextUrl.searchParams.get('category');

        if(!category){
            return createResponse('Provide a Category to search',false,400);
        }
        
        const properties = await Property.find({category:category}).sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

        if(properties.length === 0){
            return createResponse('Provide a Category to search',true,200,[]);
        }

        const totalProperties = await Property.countDocuments();
        const totalPages = Math.ceil(totalProperties / limit)

        return createResponse(`Properties fetched by category:${category}`,true,200,properties,totalPages);


    } catch (error:any

    ) {
        console.error(error.message);
        return createResponse(`Internal Server Error:${error.message}`,false,500);
    }
}