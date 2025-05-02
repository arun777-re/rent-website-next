import { v2 as cloudinaryV2 } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Initialize Cloudinary

cloudinaryV2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  [key: string]: any; // Additional properties, if any
}

// upload a single file

export const uploadImage = async(file:File):Promise<CloudinaryUploadResponse>=>{
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
        const imageUri = `data:${file.type};base64,${base64Image}`;
    return new Promise((resolve, reject) => {
        cloudinaryV2.uploader.upload(imageUri, { folder: "rentwebsite/property" }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result as CloudinaryUploadResponse);
            }
        });
    });
}

export const uploadImages = async(files:File[]):Promise<string[]> =>{
    if(files.length === 0 || files.length >10){
        throw new Error("Please upload between 1 and 10 images")
    }
    const uploads = files.map(uploadImage);
    const result = await Promise.all(uploads);
    const urls = result.map((res) => res.secure_url);
    return urls;
}
      
            
