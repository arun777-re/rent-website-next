import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import { verifyTkn, verifyUserToken } from "@/lib/middleware/verifyToken";
import { NextRequest, NextResponse } from "next/server";
import { createResponse } from "@/lib/middleware/error";
import { cookies } from "next/headers";

dbConnect();

interface CustomNextApiRequest extends NextRequest {
  user?: any;
}

export async function POST(req: CustomNextApiRequest,res:NextResponse) {
  await verifyUserToken(req,res);
  try {
    const user = req?.user;
    user.isActive = false;
    await user.save();
    const cookie = await cookies();
    cookie.set("accessToken", "", {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return createResponse("Log Out Successfully", true, 200, []);
  } catch (error: any) {
    console.error(error.message);
    return createResponse(`Internal Server Error:${error.message}`, false, 500);
  }
}
