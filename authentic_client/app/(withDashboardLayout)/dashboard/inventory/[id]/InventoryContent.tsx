/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import {
  AlertTriangle,
  Archive,
  Hash,
  Layers3,
  Package,
  Plus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { useGetSingleInventoryQuery } from "@/redux/api/inventory";
import moment from "moment";
import ATSModal from "@/components/shared/Modal/ATSModal";
import AddBatch from "./AddBatch";
import { useState } from "react";

export const formatDate = (date: string | Date) =>
  moment(date).format("DD MMM YYYY, hh:mm A");

const InventoryContentPage = ({ id }: { id: string }) => {
  const [modelOpen, setModelOpen] = useState(false)


  const { data, isLoading } = useGetSingleInventoryQuery(id);

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center text-muted-foreground">
  //       Loading inventory...
  //     </div>
  //   );
  // }

  const inventory = data?.data;
  const product = inventory?.product;
  const batches = inventory?.productBatch || [];
  console.log(batches, "from batches")

  const statusColor =
    product?.status === "ACTIVE"
      ? "bg-green-100 text-green-700 border-green-200"
      : product?.status === "DRAFT"
        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
        : "bg-red-100 text-red-700 border-red-200";

  return (
    <div className="min-h-screen bg-linear-to-b from-muted/40 to-background">
      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-6">

        {/* ================= TOP ACTION BAR ================= */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Inventory Details
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage product stock, batches & supplier data
            </p>
          </div>

        </div>

        {
          isLoading ? (
            <div className="flex h-screen items-center justify-center text-muted-foreground">
              Loading inventory...
            </div>
          ) : (
            <>
              <div className="overflow-hidden rounded-3xl border bg-background shadow-sm">
                <div className="grid gap-6 lg:grid-cols-3">

                  {/* IMAGE */}
                  <div className="relative flex items-center justify-center bg-muted/40 p-6">
                    <div className="relative h-70 w-full overflow-hidden rounded-2xl border bg-white shadow-sm">
                      <Image
                        src={
                          product?.image?.[0] !== "no image found"
                            ? product?.image?.[0]
                            : "/placeholder.png"
                        }
                        alt={product?.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* INFO */}
                  <div className="space-y-5 p-6 lg:col-span-2">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          SKU: {product?.sku}
                        </p>

                        <h1 className="mt-1 text-3xl font-bold tracking-tight">
                          {product?.name}
                        </h1>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge className={`${statusColor} rounded-full border px-3`}>
                            {product?.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="rounded-2xl border bg-linear-to-r from-primary/10 to-primary/5 p-5 text-right">
                        <p className="text-sm text-muted-foreground">
                          Selling Price
                        </p>
                        <h2 className="mt-2 text-3xl font-bold">
                          ৳ {product?.sellingPrice}
                        </h2>
                      </div>
                    </div>

                    <Separator />

                    <p className="text-sm leading-6 text-muted-foreground">
                      {product?.description}
                    </p>

                    {/* QUICK STATS */}
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <InfoCard icon={<Package />} label="Stock" value={inventory?.quantity} />
                      <InfoCard icon={<AlertTriangle />} label="Alert" value={inventory?.alertQuantity} />
                      <InfoCard icon={<Layers3 />} label="Category" value={product?.category?.name} />
                      <InfoCard icon={<Hash />} label="Inventory ID" value={inventory?.id?.slice(0, 12)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= BATCHES ================= */}
              <Card className="rounded-3xl border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Archive className="h-5 w-5" />
                    Batch Information
                  </CardTitle>

                  <Button onClick={() => setModelOpen(true)} className="gap-2 rounded-xl shadow-sm">
                    <Plus className="h-4 w-4" />
                    Add Batch
                  </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                  {batches.map((batch: any) => (
                    <div
                      key={batch?.id}
                      className="rounded-2xl border bg-linear-to-b from-muted/30 to-background p-5 shadow-sm hover:shadow-md transition"
                    >
                      <div className="grid gap-5 lg:grid-cols-3">

                        {/* LEFT */}
                        <div className="space-y-3">
                          <SectionTitle title="Batch Details" />

                          <DetailRow label="Batch" value={batch?.batchNumber} />
                          <DetailRow label="Qty" value={batch?.quantity} />
                          <DetailRow label="Remaining Qty" value={batch?.remainingQuantity} />
                          <DetailRow label="Buying" value={`৳ ${batch?.buyingPrice}`} />
                          <DetailRow label="Selling" value={`৳ ${batch?.sellingPrice}`} />
                          <DetailRow label="Cost" value={`৳ ${batch?.costPrice}`} />
                        </div>

                        {/* CENTER */}
                        <div className="space-y-3">
                          <SectionTitle title="Storage" />

                          <DetailRow label="Warehouse" value={batch?.warehouse?.name} />
                          <DetailRow label="Rack" value={batch?.rackCode} />
                          <DetailRow label="Shelf" value={batch?.shelfCode} />
                          <DetailRow label="Expiry" value={formatDate(batch?.expiryDate)} />
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-3">
                          <SectionTitle title="Supplier" />

                          <DetailRow label="Name" value={batch?.supplier?.name} />
                          <DetailRow label="Phone" value={batch?.supplier?.phone} />
                          <DetailRow label="Email" value={batch?.supplier?.email} />
                        </div>

                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </>
          )
        }





        <ATSModal open={modelOpen} setOpen={setModelOpen} description=" Create stock batch for this inventory" title="Add New Batch">
          <AddBatch setOpen={setModelOpen} />
        </ATSModal>

      </div>
    </div>
  );
};

export default InventoryContentPage;

/* ================= UI COMPONENTS ================= */

function InfoCard({
  icon,
  label,
  value,
}: any) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-2 text-muted-foreground">{icon}</div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold">{value ?? "N/A"}</p>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: any) {
  return (
    <div className="flex justify-between rounded-xl border bg-white px-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value ?? "N/A"}</span>
    </div>
  );
}

function SectionTitle({ title }: any) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
      {title}
    </h3>
  );
}