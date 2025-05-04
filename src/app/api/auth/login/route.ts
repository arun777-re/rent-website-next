import { NextRequest } from "next/server";
import Agent from "@/models/AgentSchema";
import { dbConnect } from "@/lib/db";
import { createResponse, handleValidation } from "@/lib/middleware/error";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const secret = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.formData();
    if (!body) {
      return createResponse("Provide valid Input Values", false, 400);
    }

    const adminEmail = body.get("email") as string;
    const password = body.get("password") as string;

    // validate fields
    handleValidation({ adminEmail, password });

    // check user exists with the email

    const admin = await Agent.findOne({ adminEmail });

    if (!admin) {
      return createResponse("No Admin available with this email", false, 401);
    }

    const comparePass = await admin.comparePassword(password);

    if (!comparePass) {
      return createResponse("Invalid credentials", false, 401);
    }

    const token = jwt.sign({ id: admin._id }, secret, { expiresIn: "7d" });

    (await cookies()).set("accessToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 60 * 60 * 24,
      path: "/",
    });

    const { _id, name, email, agencyName, agencyAddress, isMainAdmin } = admin;
    return createResponse("logged in", true, 200, {
      _id,
      name,
      email,
      agencyName,
      agencyAddress,
      isMainAdmin,
    });
  } catch (error: any) {
    console.error("Error during login user", error.message);
    return createResponse("Internal Server Error", false, 500);
  }
}
