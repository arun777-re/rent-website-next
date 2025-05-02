import { dbConnect } from "@/lib/db";
await dbConnect();
import Property from "@/models/Property";
import { NextResponse,NextRequest} from "next/server";
import { uploadImage, uploadImages } from "@/lib/middleware/cloudinary";
import { createResponse, handleValidation } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import slugify from 'slugify';
import {v4 as uuidv4} from 'uuid'

interface CustomRequest extends NextRequest {
    admin: { id: string };
}

export async function POST(req:CustomRequest){
await verifyTkn(req);
    try {
    const agent = req.admin.id;
    const formData = await req.formData();
    if(!formData){
        return createResponse("provide valid input data",false,400);
    }
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const type = formData.get("type") as string;
    const bedrooms = formData.get("bedrooms") as string;
    const bathrooms = formData.get("bathrooms") as string;
    const area = formData.get("area") as string;
    const images = formData.getAll("images") as File[];
    const aminities = formData.getAll("amenities") as string[];
    const featured = formData.get("featured") as string;
    const status = formData.get("status") as string;
    
    // geojson location
    const latitude = Number(formData.get("latitude"));
    const longitude = Number(formData.get("longitude"));
    const locationData = {
        type: "Point",
        coordinates: [longitude, latitude],
    };

    const address = {
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        country: formData.get("country") as string,
        postalCode: formData.get("postalCode") as string,
    }
    const owner = {
        name: formData.get("ownerName") as string,
        phone: formData.get("ownerPhone") as string,
        email: formData.get("ownerEmail") as string,
        address: formData.get("ownerAddress") as string,
    };

    if(images.length === 0){
        return createResponse("Upload at least one image",false,400);
    }

    const slug = slugify(title,{lower:true,strict:true}) + "-" + uuidv4().slice(0,8);

    // handle validation for the fields
     handleValidation({
        title,
        description,
        price,
        type,
        bedrooms,
        bathrooms,
        area,
        images,
        agent,
        featured,
        status,
        location: locationData,
        owner,
        amenities: aminities,
        address:address
    });
  
    const uploadImageUrls:string[] = [];

   const secure_url = await uploadImages(images);
   secure_url.forEach((url)=>{
    uploadImageUrls.push(url);
   });

   const newProperty = new Property({
    title,
    description,
    price,
    type,
    bedrooms,
    bathrooms,
    area,
    images:uploadImageUrls,
    agent,
    slug,
    featured,
    status,
    location: locationData,
    owner,
    amenities: aminities,
    address:address
   });

   await newProperty.save();
   return createResponse("property created successfully",true,201);

} catch (error) {
        console.error(error);
        return createResponse("Internal Server Error",false,500);
}

}


// to get all the properties
export async function GET(req:CustomRequest){
    const authResult = await verifyTkn(req);
  if (authResult instanceof NextResponse) return authResult;
    try {
        const allProperty = await Property.find();
        if(allProperty.length === 0){
            return createResponse('No property to show',true,200,[]);
        }
        
        return createResponse('Fetched all properties successfully',true,200,allProperty);
    } catch (error:any) {
        console.error("Error during get Property",error.message);
        return createResponse(`${error.message}`,false,500)
    }
}