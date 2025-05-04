import { NextResponse, NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import { createResponse, handleValidation } from "@/lib/middleware/error";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dotenv from "dotenv";
import User from "@/models/User";
dotenv.config();

const secret = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();

    // validation for body
    if (!body) {
      return NextResponse.json(
        { success: false, message: "Provide Data" },
        { status: 400 }
      );
    }

    const firstName = body.firstName;
    const lastName = body.lastName;
    const email = body.email;
    const phone = body.phone;
    const password = body.password;

    // handle validation
    handleValidation({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
    });

    await newUser.save();
    const cookie = await cookies();
    const accesstoken = jwt.sign({ id: newUser._id }, secret, {
      expiresIn: "7d",
    });
    const refreshtoken = jwt.sign({ id: newUser._id }, secret, {
      expiresIn: "30d",
    });

    cookie.set({
      name: "accesstoken",
      value: accesstoken,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    cookie.set({
      name: "refreshtoken",
      value: refreshtoken,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return createResponse("Admin created successfully", true, 201, []);
  } catch (error: any) {
    console.error(error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}
