import { NextRequest } from "next/server";
import { dbConnect } from "@/lib/db";
import { createResponse, handleValidation } from "@/lib/middleware/error";
import jwt from "jsonwebtoken";
import User from "@/models/User";

const secret = process.env.JWT_SECRET || "";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();

    if (!body) {
      return createResponse("Provide valid input values", false, 400);
    }

    const { email, password } = body;
    console.log(body);

    // validate fields
    handleValidation({ email, password });

    // check user exists with the email

    const admin = await User.findOne({ email });

    if (!admin) {
      return createResponse("No User available with this email", false, 401);
    }

    const comparePass = await admin.comparePassword(password);

    if (!comparePass) {
      return createResponse("Invalid credentials", false, 401);
    }

    const token = jwt.sign({ id: admin._id }, secret, { expiresIn: "7d" });
    const refreshtoken = jwt.sign({id:admin._id},secret,{expiresIn:'30d'});

    const response = createResponse("logged in", true, 200, admin);
    response.cookies.set('accesstoken',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      maxAge:7 * 24 * 60 * 60,
      sameSite:'strict',
      path:"/"
    });
    response.cookies.set('refreshtoken',refreshtoken,{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      maxAge:30 * 24 * 60 * 60,
      sameSite:'strict',
      path:"/"

    })
    return response;
  } catch (error: any) {
    console.error("Error during login user", error.message);
    return createResponse("Internal Server Error", false, 500);
  }
}
