import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import Collection from "@/lib/models/Collection";
import { NextRequest, NextResponse } from "next/server";

//POST COLLECTION DATA
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

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

    return NextResponse.json(collections, { status: 200 });
  } catch (err) {
    console.log("[collections_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
