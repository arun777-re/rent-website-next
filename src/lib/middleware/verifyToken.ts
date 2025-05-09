import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Agent from "@/models/AgentSchema";
import { cookies } from "next/headers";
import { createResponse } from "./error";
import User from "@/models/User";

interface CustomReq extends NextRequest {
  admin?: any;
  user?: any;
}

export const runtime = "nodejs";

const secret = process.env.JWT_SECRET || "";

export const verifyTkn = async (req: CustomReq) => {
  try {
    const cookie = await cookies();
    const token = cookie.get("adminToken")?.value;
    if (!token) {
      throw new Error("Token not available");
    }

    const decoded = jwt.verify(token, secret) as { id: string };

    const admin = await Agent.findById(decoded.id);

    if (!admin) {
      throw new Error('Admin not found');
    }
    req.admin = admin;

    return ;
  } catch (error: any) {
    console.error("JWT verification error", error.message);
    if (error.name === "TokenExpiredError") {
      return createResponse("Token Expired", false, 403);
    } else if (error.name === "JsonWebTokenError") {
      return createResponse("Invalid Token", false, 403);
    }
    return createResponse("Invalid or expired token", false, 403);
  }
};

// middleware to verify user access token
export const verifyUserToken = async (req: CustomReq, res: NextResponse) => {
  try {
    const cookie = await cookies();
    const token = cookie.get("accesstoken")?.value;

    // If no access token is provided, try the refresh token
    if (!token) {
      const refreshToken = cookie.get("refreshtoken")?.value;
      if (!refreshToken) {
      throw new Error('refresh token is not available login/signup again')
      }

      // Verify the refresh token
      const decodedRefresh = await verifyToken(refreshToken);

      // Find the user based on the decoded ID from the refresh token
      const user = await User.findById(decodedRefresh.id);
      if (!user) {
        throw new Error('user not found')
      }

      // Generate new access token and refresh token
      const newAccessToken = jwt.sign({ id: user._id }, secret, {
        expiresIn: "1h",
      });
      const newRefreshToken = jwt.sign({ id: user._id }, secret, {
        expiresIn: "7d",
      });

      req.user = user;
      res.cookies.set("accesstoken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60, // 1 hour
      });

      res.cookies.set("refreshtoken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      return; // ✅ Set the new tokens in response cookies
    }

    // Verify the access token
    const decoded = await verifyToken(token);

    // Find the user based on the decoded ID from the access token
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new Error("User Not Found");
    }

    // Update the user's active status
    user.isActive = true;
    await user.save();

    // Set user in request and proceed
    req.user = user;
    return ;
  } catch (error: any) {
    console.error("Token verification error", error.message);
    if (error.name === "TokenExpiredError") {
      return createResponse("Token Expired", false, 401);
    } else if (error.name === "JsonWebTokenError") {
      return createResponse("Invalid Token", false, 401);
    } else {
      return createResponse("Internal Server Error", false, 401);
    }
  }
};

// Helper function to verify JWT token
const verifyToken = async (token: string) => {
  return new Promise<any>((resolve, reject) => {
    if (!token) {
      reject(new Error("No token provided"));
      return;
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};
