import { DataTable } from "@/components/custom ui/DataTable";
import { columns } from "@/components/orderItem/OrderItemColumn";
import { FormatRupiah } from "@arismun/format-rupiah";
import React from "react";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  return (
    <div className="px-3 md:px-10 py-5">
      <h1 className="text-heading2-bold text-primaryBlack text-center mt-3">
        Detail Order
      </h1>
      <div className="flex flex-col p-2 md:p-10 gap-5 mt-5">
        <p className="text-base-bold">
          Order ID: <span className="text-base-medium">{orderDetails._id}</span>
        </p>
        <p className="text-base-bold">
          Customer name:{" "}
          <span className="text-base-medium">{customer.name}</span>
        </p>
        <p className="text-base-bold">
          Customer email:{" "}
          <span className="text-base-medium">{customer.email}</span>
        </p>
        <p className="text-base-bold">
          Shipping address:{" "}
          <span className="text-base-medium">
            {street}, {city}, {state}, {postalCode}, {country}
          </span>
        </p>
        <p className="text-base-bold">
          Total Paid:{" "}
          <span className="text-base-medium">
            <FormatRupiah value={orderDetails.totalAmount} />
          </span>
        </p>
        <p className="text-base-bold">
          Shipping rate ID:{" "}
          <span className="text-base-medium">{orderDetails.shippingRate}</span>
        </p>
        <DataTable
          columns={columns}
          data={orderDetails.products}
          searchKey="product"
        />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default OrderDetails;
