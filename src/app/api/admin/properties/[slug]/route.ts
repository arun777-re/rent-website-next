import { dbConnect } from "@/lib/db";
import { createResponse, verifyAccess } from "@/lib/middleware/error";
import { verifyTkn, verifyUserToken } from "@/lib/middleware/verifyToken";
import Property from "@/models/Property";
import { NextRequest,NextResponse } from "next/server";



// find a particular property
export async function GET(req:NextRequest,res:NextResponse){
   await verifyAccess(req,res);
    try {
        const slug = req.nextUrl.searchParams.get('slug');
        if(!slug){
            return createResponse('Missing property slug', false, 400);
        }

          const property = await Property.findOne({slug:slug});
          if(!property){
            return createResponse('No such Property exists',true,200,[])
          }

          return createResponse('fetch property successfull',true,200,property);

    } catch (error:any) {
         console.error(error.message);
                return createResponse(`${error.message}`,false,500)
    }
}


// put request to change status of property
export async function PUT(req:NextRequest){
    await verifyTkn(req);
    try {
        const propertyId = req.nextUrl.searchParams.get('propertyId');
        
        if(!propertyId){
            return createResponse('Provide appropriate propertyId',false,400);
        }

        const body =await req.json();
      const {status} = body;
      if(!status){
        return createResponse('Provide data to provide',false,400);
    }
        const property = await Property.findByIdAndUpdate(propertyId,{status:status},{new:true});

        if(!property){
            return createResponse('No such Property exists',false,400);
        }

        return createResponse('Status of property Changed',true,200);

    } catch (error:any) {
        console.error("Error during get search Property", error.message);
        return createResponse(`${error.message}`, false, 500);
    }
}