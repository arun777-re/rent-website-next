import { createResponse } from "@/lib/middleware/error";
import { verifyUserToken } from "@/lib/middleware/verifyToken";
import Favorite from "@/models/Favorate";
import Property from "@/models/Property";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import UserInteraction from "@/models/UserInterAction";
dbConnect();

interface customReq extends NextRequest {
  user?: any;
}

export async function GET(req: customReq, res: NextResponse) {
  const authResult = await verifyUserToken(req, res);
  if (authResult instanceof NextResponse) return authResult;
  try {
    const { userId } = req.user;

    // getting the users last top 10 interaction
    const interaction = await UserInteraction.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);

    const preferredCategories = interaction
      .map((i) => i.category)
      .filter(Boolean);
    const preferredLocation = interaction
      .map((i) => i.location)
      .filter(Boolean);

    const liked = await Favorite.find({ userId }).select("propertyId");
    const likedIds = liked.map((f) => f.propertyId).filter(Boolean);

    const recommended = await Property.find({
      featured: true,
      _id: { $nin: likedIds },
      $or: [
        { category: { $in: preferredCategories } },
        { location: { $in: preferredLocation } },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(10);

    if (recommended.length === 0) {
      const featuredProperties = await Property.find({ featured: true })
        .sort({ createdAt: -1 })
        .limit(10);
      if (featuredProperties.length === 0) {
        return createResponse("No Featured Property to show", true, 200, []);
      }

      return createResponse(
        "Recommended Featured Properties are:",
        true,
        200,
        featuredProperties
      );
    }
    return createResponse(
      "Recommended Featured Properties are:",
      true,
      200,
      recommended
    );
  } catch (error: any) {
    console.error("Error during get search Property", error.message);
    return createResponse(`${error.message}`, false, 500);
  }
}
