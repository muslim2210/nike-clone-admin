"use client";
import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/orders/OrderColumn";
import { Separator } from "@radix-ui/react-separator";
import React, { useEffect, useState } from "react";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`);
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.log("[orders_GET", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="py-12 px-10">
      <p className="text-heading2-bold text-primaryBlack">Orders</p>
      <Separator className="bg-primaryBlack mt-4 mb-7" />
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  );
};

export default Orders;
