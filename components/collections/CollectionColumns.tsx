"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import Delete from "../custom ui/Delete";
import { Button } from "../ui/button";

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:text-red-1 capitalize font-uniqlo"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        <Link href={`/collections/${row.original._id}`}>
          <Button className="bg-yellow-400">
            <FilePenLine className="h-4 w-4 text-white" />
          </Button>
        </Link>
        <Delete item="collection" id={row.original._id} />
      </div>
    ),
  },
];
