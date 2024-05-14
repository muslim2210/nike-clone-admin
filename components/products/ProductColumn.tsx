"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import Delete from "../custom ui/Delete";
import { Button } from "../ui/button";

import { FormatRupiah } from "@arismun/format-rupiah";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/products/${row.original._id}`} className="hover:text-red-1">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) =>
      row.original.collections.map((collection) => collection.title).join(", "),
  },
  {
    accessorKey: "price",
    header: "Price (Rp)",
    cell: ({ row }) => {
      return (
        <span className="text-primaryBlack2">
          <FormatRupiah value={row.original.price} />
        </span>
      );
    },
  },
  {
    accessorKey: "expense",
    header: "Expense (Rp)",
    cell: ({ row }) => {
      return (
        <span className="text-primaryBlack2">
          <FormatRupiah value={row.original.expense} />
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4 items-center">
        <Link href={`/products/${row.original._id}`}>
          <Button className="bg-yellow-400">
            <FilePenLine className="h-4 w-4 text-white" />
          </Button>
        </Link>
        <Delete item="product" id={row.original._id} />
      </div>
    ),
  },
];
