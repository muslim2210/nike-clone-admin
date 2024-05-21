"use client";

import { FormatRupiah } from "@arismun/format-rupiah";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

export const columns: ColumnDef<OrderColumnType>[] = [
  {
    accessorKey: "_id",
    header: "Order",
    cell: ({ row }) => {
      return (
        <Link
          href={`/products/${row.original._id}`}
          className="hover:text-red-1"
        >
          {row.original._id}
        </Link>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "totalAmount",
    header: "Total (Rp.)",
    cell: ({ row }) => {
      return <FormatRupiah value={row.original.totalAmount} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
];
