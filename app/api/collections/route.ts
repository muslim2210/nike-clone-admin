import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import Collection from "@/lib/models/Collection";
import { NextRequest, NextResponse } from "next/server";

// Config CORS
// ========================================================
/**
 *
 * @param origin
 * @returns
 */

const getCorsHeaders = (origin: string) => {
  // Default options
  const headers = {
    "Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
    "Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
    "Access-Control-Allow-Origin": `${process.env.DOMAIN_URL}`,
  };

  // If no allowed origin is set to default server origin
  if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

  // If allowed origin is set, check if origin is in allowed origins
  const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

  // Validate server origin
  if (allowedOrigins.includes("*")) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  // Return result
  return headers;
};

//POST COLLECTION DATA
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    await connectToDB();

    const { title, description, image } = await req.json();

    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new NextResponse("Collection already exists", {
        status: 401,
      });
    }

    if (!title || !image) {
      return new NextResponse("Missing required fields", {
        status: 401,
      });
    }

    const newCollection = await Collection.create({
      title,
      description,
      image,
    });

    await newCollection.save();
    return NextResponse.json(newCollection, {
      status: 200,
    });
  } catch (err) {
    console.log("[collections_POST]", err);
    return new NextResponse("Something went wrong! Please try again.", {
      status: 500,
    });
  }
};

//GET DATA COLLECTION
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const collections = await Collection.find().sort({ createdAt: "desc" });

    return NextResponse.json(collections, {
      status: 200,
      headers: getCorsHeaders(req.headers.get("origin") || ""),
    });
  } catch (err) {
    console.log("[collections_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
