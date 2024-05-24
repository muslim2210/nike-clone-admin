"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { columns } from "@/components/collections/CollectionColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="py-12 px-5 md:px-24">
      <div className="flex items-center justify-between">
        <h1 className="text-heading3-bold md:text-heading3-bold text-primaryBlack">
          Collections
        </h1>
        <Button
          className="md:hidden bg-primaryBlack text-white"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
        <Button
          className="hidden md:flex bg-primaryBlack text-white"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Collections
        </Button>
      </div>
      <Separator className="bg-primaryBlack mt-4 mb-7" />
      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Collections;
