import { NextRequest, NextResponse } from "next/server";
import { verifyTkn, verifyUserToken } from "./verifyToken";
import mongoose from "mongoose";

export const handleValidation = (fields: Record<string, any>) => {
  const missing = Object.entries(fields).filter(
    ([key, value]) => value === undefined || value === null || value === ""
  );

  if (missing.length > 0) {
    const missingKeys = missing.map(([key]) => key).join(",");
    return NextResponse.json(
      {
        success: false,
        message: `Missing required fields :${missingKeys} and should not be empty`,
      },
      { status: 400 }
    );
  }
};

// this is used to handle response allover
export const createResponse = (
  message: string,
  success: boolean,
  status: number,
  data?: any,
  totalPages?: number,
  dataLength?: number
) => {
  return NextResponse.json(
    {
      success,
      message,
      data,
      totalPages,
      dataLength,
    },
    { status }
  );
};

// function for pagination
export const paginationFunc = async (
  searchParams: URLSearchParams,
  model: mongoose.Model<any>,
  filter: Object = {}
) => {
  const pageParams: any = searchParams.get("page");
  const limitParams: any = searchParams.get("limit");
  const page = parseInt(pageParams) || 1;
  const limit = parseInt(limitParams) || 10;
  const skip = (page - 1) * limit;

  const totalItems = await model.countDocuments(filter);
  const totalPages = Math.ceil(totalItems / page);
  return { page, limit, skip, totalPages, totalItems };
};

export async function verifyAccess(req: NextRequest, res: NextResponse) {
  const accessType = req.nextUrl.searchParams.get("access");
  if (accessType === "secure") {
    const tokenVerifier = await verifyTkn(req);
    return tokenVerifier;
  } else {
    const tokenVerifier = await verifyUserToken(req, res);
    return tokenVerifier;
  }
}

// Initialize the cors middleware
export async function runCors(res: NextResponse) {
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}
