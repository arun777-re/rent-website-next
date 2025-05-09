import { NextResponse, NextRequest } from "next/server";
import Agent from "@/models/AgentSchema";
import { dbConnect } from "@/lib/db";
import { createResponse, handleValidation } from "@/lib/middleware/error";
import InviteCode from "@/models/InviteCode";
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";
import dotenv from 'dotenv';
dotenv.config();
 dbConnect();

const secret = process.env.JWT_SECRET || '';

export async function POST(req: NextRequest) {
  
  try {
    const body = await req.json();

    // validation for body
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Provide Data" },
        { status: 400 }
      );
    }

    const name = body.name;
    const phone = body.phone;
    const code = body.code;
    const email = body.email;
    const password = body.password;
    const agencyName = body.agencyName;
    const agencyAddress = body.agencyAddress;
    const licenseNumber = body.licenseNumber;

    // handle validation
     handleValidation({
      name,
      phone,
      agencyAddress,
      agencyName,
      email,
      licenseNumber,
      password,
    });

    const countDocuments = await Agent.countDocuments();

    // check if it is first admin
    if (countDocuments === 0) {
      const newAdmin = await new Agent({
        name,
        phone,
        email,
        agencyAddress,
        agencyName,
        licenseNumber,
        password,
        isMainAdmin: true,
      });

      await newAdmin.save();
      const token = jwt.sign({id:newAdmin._id},secret,{expiresIn:'7d'});
      
     
      const response = createResponse(`Admin account created with ${name}`,true,201);
      response.cookies.set('adminToken',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:"none",
        maxAge:7 * 60 * 60 * 24,
        path:"/"
      });

      return response;

    } else if (countDocuments >= 1 && code) {
      if (!code) {
        return createResponse(`InviteCode Required`,false,400);
      }

      //   check for code duplicasy
      const isCode = await InviteCode.findOne({ code });
      if (!isCode || isCode.isUsed) {
        return createResponse('Used Code',false,401);
      }

      // check whether admin is existing with the same email
      const isExistingAdmin = await Agent.findOne({ email });
      if (isExistingAdmin) {
        return createResponse('User Already exists with same email',false,401);
      }
      const newAdmin = await new Agent({
        name,
        phone,
        email,
        agencyAddress,
        agencyName,
        licenseNumber,
        password,
        code: isCode._id,
      });

      await newAdmin.save();

      isCode.isUsed = true;
      await isCode.save();

    //   generate token
    const token = jwt.sign({id:newAdmin._id},secret,{expiresIn:'7d'});
    //   set cookie
    const response = createResponse(`Admin account created with ${name}`,true,201);
    response.cookies.set('adminToken',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite:"none",
      maxAge:7 * 60 * 60 * 24,
      path:"/"
    });
    return response;
    }

    return createResponse('Invalid Request',false,400);
  } catch (error: any) {
    console.error(error.message);
    return createResponse(`${error.message}`,false,500);
  }
}
