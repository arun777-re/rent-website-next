import { dbConnect } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse,NextRequest} from "next/server";
import { createResponse, paginationFunc } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";

await dbConnect();

interface CustomRequest extends NextRequest {
    admin?:any;
}

// to get all the properties

export async function GET(req:CustomRequest){
    const authResult = await verifyTkn(req);
  if (authResult instanceof NextResponse) return authResult;
    try {
        const {totalItems,totalPages,limit,skip} = await paginationFunc(req.nextUrl.searchParams,Property);
        const allProperty = await Property.find().sort({createdAt:-1}).skip(skip).limit(limit);

        if(allProperty.length === 0){
            return createResponse('No property to show',true,200,[]);
        }
        
        return createResponse('Fetched all properties successfully',true,200,allProperty,totalPages,totalItems);
    } catch (error:any) {
        console.error("Error during get Property",error.message);
        return createResponse(`${error.message}`,false,500)
    }
}