import { dbConnect } from "@/lib/db";
import Property from "@/models/Property";
import { NextResponse,NextRequest} from "next/server";
import { uploadImages } from "@/lib/middleware/cloudinary";
import { createResponse, handleValidation, paginationFunc } from "@/lib/middleware/error";
import { verifyTkn } from "@/lib/middleware/verifyToken";
import slugify from 'slugify';
import {v4 as uuidv4} from 'uuid'

await dbConnect();


export const runtime = "nodejs";


interface CustomRequest extends NextRequest {
    admin?:any;
}

export async function POST(req:CustomRequest){
    const tokenResult = await verifyTkn(req);
    if(tokenResult instanceof NextResponse){
      return tokenResult
    }
    try {
    const agent = req.admin;
    const formData = await req.formData();

    console.log("formdata is",formData)


    if(!formData){
        return createResponse("provide valid input data",false,400);
    }
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
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
 

    const locationData = JSON.parse(formData.get("location") as string);
    const address = JSON.parse(formData.get("address") as string);
    const owner = JSON.parse(formData.get("owner") as string);
    

    if(images.length === 0){
        return createResponse("Upload at least one image",false,400);
    }

    const slug = slugify(title,{lower:true,strict:true}) + "-" + uuidv4().slice(0,8);

    // handle validation for the fields
     handleValidation({
        title,
        description,
        price,
        category,
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
    category,
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

} catch (error:any) {
        console.error(error.message);
        return createResponse(`Internal Server Error:${error.message}`,false,500);
}

}


