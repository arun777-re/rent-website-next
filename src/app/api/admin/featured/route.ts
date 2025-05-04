import { createResponse, paginationFunc } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";


// api to get featured property
export async function GET(req:NextRequest){
    const authResult = await verifyTkn(req);
    if(authResult instanceof NextResponse) return authResult;
    
    try {
        const filter = {featured:true}
        const {skip,totalItems,totalPages,limit} = await paginationFunc(req.nextUrl.searchParams,Property,filter);
        const featured = await Property.find(filter).sort({createdAt:-1}).skip(skip).limit(limit);

        if(featured.length === 0){
        return createResponse('No Featured Property available',true,200,[],0,0);

        }
        return createResponse('Fetched Featured Property are',true,200,featured,totalPages,totalItems);

    } catch (error:any) {
        console.error(error.message);
        return createResponse(`Internal Server Error:${error.message}`,true,200,[],0,0);
    }
}