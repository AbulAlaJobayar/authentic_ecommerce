/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";
import moment from "moment";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ChevronDown,
  ChevronUp,
  Loader2,
  SquarePen,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Link from "next/link";

// ======================================================
// TYPES
// ======================================================

type Props = {
  columns: {
    key: string;
    label: string;
  }[];

  data: any[];

  isLoading?: boolean;

  onSort?: (key: string) => void;

  sortBy?: string;

  sortOrder?: "asc" | "desc";
};

// ======================================================
// HELPERS
// ======================================================

const getNestedValue = (obj: any, path: string): any =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

const getBatchValue = (item: any, field: string) => {
  return item?.productBatch?.[0]?.[field];
};

const isImageUrl = (val: any): boolean => {
  if (typeof val !== "string") return false;

  return (
    val.startsWith("http") ||
    val.startsWith("/") ||
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val)
  );
};

// ======================================================
// STATUS BADGE
// ======================================================

const StatusBadge = ({ status }: { status: string }) => {
  const map: Record<
    string,
    {
      label: string;
      className: string;
    }
  > = {
    ACTIVE: {
      label: "Active",
      className:
        "bg-green-100 text-green-700 border-green-200",
    },

    DRAFT: {
      label: "Draft",
      className:
        "bg-amber-100 text-amber-700 border-amber-200",
    },

    DISCONTINUED: {
      label: "Discontinued",
      className:
        "bg-red-100 text-red-700 border-red-200",
    },
  };

  const cfg = map[status] || map["DRAFT"];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
        cfg.className
      )}
    >
      {cfg.label}
    </span>
  );
};

// ======================================================
// QUANTITY BAR
// ======================================================

const QuantityBar = ({
  quantity,
  alertQuantity,
}: {
  quantity: number;
  alertQuantity: number;
}) => {
  const isLow =
    quantity <= alertQuantity && quantity > 0;

  const isOut = quantity === 0;

  const pct = Math.min(
    100,
    Math.round(
      (quantity /
        Math.max(alertQuantity * 5, 50)) *
      100
    )
  );

  const barColor = isOut
    ? "bg-red-500"
    : isLow
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="flex items-center gap-2 min-w-[130px]">
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full",
            barColor
          )}
          style={{
            width: `${pct}%`,
          }}
        />
      </div>

      <span className="text-sm font-semibold tabular-nums">
        {quantity}
      </span>

      {isLow && !isOut && (
        <AlertTriangle
          size={14}
          className="text-amber-500"
        />
      )}
    </div>
  );
};

// ======================================================
// CATEGORY PILL
// ======================================================

const CategoryPill = ({
  category,
}: {
  category: {
    id: string;
    name: string;
  };
}) => {
  if (!category) {
    return (
      <span className="text-xs text-muted-foreground">
        —
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-muted text-xs font-medium">
      {category.name}
    </span>
  );
};

// ======================================================
// MAIN COMPONENT
// ======================================================

const InventoryTable = ({
  columns,
  data,
  isLoading,
  onSort,
  sortBy,
  sortOrder,
}: Props) => {
  const [editOpen, setEditOpen] =
    useState(false);

  const [editedId, setEditedId] =
    useState("");

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deletedId, setDeletedId] =
    useState("");

  // ======================================================
  // HANDLERS
  // ======================================================


  console.log(data, "from inventory Table")

  const handleEdit = (id: string) => {
    setEditedId(id);
    setEditOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletedId(id);
    setDeleteOpen(true);
  };

  // ======================================================
  // CELL RENDERER
  // ======================================================

  const renderCell = (
    columnKey: string,
    item: any
  ) => {
    // ======================================================
    // ACTIONS
    // ======================================================

    if (columnKey === "id") {
      return (
        <div className="flex items-center gap-1.5">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() =>
              handleEdit(item.id)
            }
          >
            <SquarePen size={14} />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 border-red-200 text-red-600 hover:bg-red-50"
            onClick={() =>
              handleDelete(item.id)
            }
          >
            <Trash2 size={14} />
          </Button>
        </div>
      );
    }

    // ======================================================
    // IMAGE
    // ======================================================

    if (columnKey === "product.image") {
      const value = getNestedValue(
        item,
        columnKey
      );

      const src = Array.isArray(value)
        ? value[0]
        : value;

      const validImage =
        src &&
        src !== "no image found" &&
        isImageUrl(src);

      return validImage ? (
        <Image
          src={src}
          alt={item.product?.name}
          width={42}
          height={42}
          className="rounded-lg object-cover border"
        />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-muted border flex items-center justify-center">
          <span className="text-[10px] font-semibold text-muted-foreground">
            {item.product?.name
              ?.slice(0, 2)
              ?.toUpperCase()}
          </span>
        </div>
      );
    }

    // ======================================================
    // PRODUCT NAME
    // ======================================================

    if (columnKey === "product.name") {
      return (
        <div className="space-y-1">
          <p className="text-sm font-semibold leading-none">
            {item.product?.name}
          </p>

          <p className="text-[11px] text-muted-foreground font-mono">
            {item.product?.sku}
          </p>
        </div>
      );
    }

    // ======================================================
    // CATEGORY
    // ======================================================

    if (columnKey === "product.category") {
      return (
        <CategoryPill
          category={item.product?.category}
        />
      );
    }

    // ======================================================
    // BATCH
    // ======================================================

    if (
      columnKey ===
      "productBatch.batchNumber"
    ) {
      return (
        <span className="font-mono text-xs">
          {getBatchValue(
            item,
            "batchNumber"
          ) || "—"}
        </span>
      );
    }

    // ======================================================
    // WAREHOUSE
    // ======================================================

    if (
      columnKey ===
      "productBatch.warehouse"
    ) {
      return (
        <div>
          <p className="text-sm font-medium">
            {
              item?.productBatch?.[0]
                ?.warehouse?.name
            }
          </p>

          <p className="text-[11px] text-muted-foreground line-clamp-1 max-w-45">
            {
              item?.productBatch?.[0]
                ?.warehouse?.address
            }
          </p>
        </div>
      );
    }

    // ======================================================
    // SUPPLIER
    // ======================================================

    if (
      columnKey ===
      "productBatch.supplier"
    ) {
      return (
        <div>
          <p className="text-sm font-medium">
            {
              item?.productBatch?.[0]
                ?.supplier?.name
            }
          </p>

          <p className="text-[11px] text-muted-foreground">
            {
              item?.productBatch?.[0]
                ?.supplier?.phone
            }
          </p>
        </div>
      );
    }

    // ======================================================
    // EXPIRY DATE
    // ======================================================

    if (
      columnKey ===
      "productBatch.expiryDate"
    ) {
      const expiry = getBatchValue(
        item,
        "expiryDate"
      );

      return (
        <span className="text-xs">
          {expiry
            ? moment(expiry).format(
              "DD MMM YYYY"
            )
            : "—"}
        </span>
      );
    }

    // ======================================================
    // QUANTITY
    // ======================================================

    if (columnKey === "quantity") {
      return (
        <QuantityBar
          quantity={item.quantity}
          alertQuantity={
            item.alertQuantity
          }
        />
      );
    }

    // ======================================================
    // PRICE
    // ======================================================

if (columnKey === "product.sellingPrice") {
  const activeBatch = getActiveBatch(item);

  const sellingPrice =
    activeBatch?.sellingPrice ??
    item?.product?.sellingPrice ??
    0;

  return (
    <div>
      <p className="text-sm font-semibold">
        ৳{sellingPrice}
      </p>


    </div>
  );
}
    // ======================================================
    // STATUS
    // ======================================================

    if (
      columnKey === "product.status"
    ) {
      return (
        <StatusBadge
          status={
            item.product?.status
          }
        />
      );
    }

    // ======================================================
    // CREATED DATE
    // ======================================================

    if (
      columnKey
        .toLowerCase()
        .includes("createdat")
    ) {
      const value = getNestedValue(
        item,
        columnKey
      );

      return (
        <div className="space-y-0.5">
          <p className="text-xs font-medium">
            {moment(value).format(
              "DD MMM YYYY"
            )}
          </p>

          <p className="text-[11px] text-muted-foreground">
            {moment(value).fromNow()}
          </p>
        </div>
      );
    }

    // ======================================================
    // BOOLEAN
    // ======================================================

    if (columnKey === "isDeleted") {
      return (
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
            item.isDeleted
              ? "bg-red-100 text-red-700 border-red-200"
              : "bg-green-100 text-green-700 border-green-200"
          )}
        >
          {item.isDeleted
            ? "Deleted"
            : "Active"}
        </span>
      );
    }

    // ======================================================
    // DEFAULT
    // ======================================================

    const value = getNestedValue(
      item,
      columnKey
    );

    return (
      <span className="text-sm">
        {String(value ?? "—")}
      </span>
    );
  };

  // ======================================================
  // LOADING
  // ======================================================

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2
          size={22}
          className="animate-spin text-muted-foreground"
        />
      </div>
    );
  }

  // ======================================================
  // JSX
  // ======================================================

  return (
    <>
      <div className="overflow-x-auto">
        <Table>

          {/* ====================================================== */}
          {/* HEADER */}
          {/* ====================================================== */}

          <TableHeader>
            <TableRow className="hover:bg-transparent">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  onClick={() =>
                    onSort?.(col.key)
                  }
                  className={cn(
                    "text-[11px] uppercase tracking-wide font-semibold text-muted-foreground whitespace-nowrap",
                    onSort &&
                    "cursor-pointer hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-1">
                    {col.label}

                    {sortBy === col.key &&
                      (sortOrder ===
                        "desc" ? (
                        <ChevronDown
                          size={14}
                        />
                      ) : (
                        <ChevronUp
                          size={14}
                        />
                      ))}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* ====================================================== */}
          {/* BODY */}
          {/* ====================================================== */}

          <TableBody>
            {data?.length > 0 ? (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/40 transition-colors"
                >
                  {columns.map((col) => (

                    <TableCell
                      key={col.key}
                      className="py-3"
                    >
                      <Link href={`/dashboard/inventory/${item.id}`}>
                        {renderCell(col.key, item)}
                      </Link>
                    </TableCell>

                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length
                  }
                  className="text-center py-20"
                >
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      No inventory found
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Try changing filters
                      or search
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ====================================================== */}
      {/* EDIT MODAL */}
      {/* ====================================================== */}

      {/* <ATSModal
        open={editOpen}
        setOpen={setEditOpen}
        title="Edit Inventory"
      >
        <EditInventory
          id={editedId}
          setOpen={setEditOpen}
        />
      </ATSModal> */}

      {/* ====================================================== */}
      {/* DELETE MODAL */}
      {/* ====================================================== */}

      {/* <DeleteInventory
        id={deletedId}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      /> */}
    </>
  );
};

export default InventoryTable;

 const getActiveBatch = (item: any) => {
  const batches = item?.productBatch || [];

  if (!batches.length) return null;

  // Example: FIFO + available stock
  return batches
    .filter((b: any) => b.remainingQuantity > 0)
    .sort(
      (a: any, b: any) =>
        new Date(a.expiryDate).getTime() -
        new Date(b.expiryDate).getTime()
    )[0];
};