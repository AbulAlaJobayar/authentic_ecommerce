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

import { ChevronDown, ChevronUp, Loader2, SquarePen } from "lucide-react";
import { Trash2Icon } from "@animateicons/react/lucide";

import ATSModal from "@/components/shared/Modal/ATSModal";
import EditProduct from "../EditedProduct";
import DeleteProduct from "../DeleteProduct";

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

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};

const ProductTable = ({
  columns,
  data,
  isLoading,
  onSort,
  sortBy,
  sortOrder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [editedId, setEditedId] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const handleEdit = (id: string) => {
    setEditedId(id);
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeletedId(id);
    setIsDeleteOpen(true);
  };

  const isImageUrl = (val: any): boolean => {
    if (typeof val !== "string") return false;
    return (
      val.startsWith("http") ||
      val.startsWith("/") ||
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val)
    );
  };

  const renderValue = (columnKey: string, value: any) => {
    // IMAGE ARRAY SUPPORT
    if (Array.isArray(value)) {
      const first = value?.[0];

      if (isImageUrl(first)) {
        return (
          <Image
            src={first}
            alt="image"
            width={40}
            height={40}
            className="rounded-md object-cover"
          />
        );
      }

      return <span>{first}</span>;
    }

    // IMAGE STRING
    if (isImageUrl(value)) {
      return (
        <Image
          src={value}
          alt="image"
          width={40}
          height={40}
          className="rounded-md object-cover"
        />
      );
    }

    // DATE
    if (columnKey.toLowerCase().includes("createdat")) {
      return <span>{moment(value).format("ll")}</span>;
    }

    // STATUS BADGE
    if (columnKey === "status") {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          {value}
        </span>
      );
    }

    // IS DELETED BADGE
    if (columnKey === "isDeleted") {
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {value ? "Deleted" : "Active"}
        </span>
      );
    }

    return <span>{String(value ?? "")}</span>;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <Table>
        {/* HEADER */}
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>
                <div
                  className="flex items-center gap-2 cursor-pointer select-none"
                  onClick={() => onSort?.(column.key)}
                >
                  {column.label}

                  {sortBy === column.key &&
                    (sortOrder === "desc" ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronUp size={16} />
                    ))}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {data?.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => {
                  const value = getNestedValue(item, column.key);

                  return (
                    <TableCell key={column.key}>
                      {column.key === "id" ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleEdit(item.id)}
                          >
                            <SquarePen size={16} />
                          </Button>

                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2Icon size={16} />
                          </Button>
                        </div>
                      ) : (
                        renderValue(column.key, value)
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-10 text-gray-500"
              >
                No Data Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* MODALS */}
      <ATSModal open={open} setOpen={setOpen} title="Edit Product">
        <EditProduct id={editedId} setOpen={setOpen} />
      </ATSModal>

      <DeleteProduct
        id={deletedId}
        open={isDeleteOpen}
        setOpen={setIsDeleteOpen}
      />
    </div>
  );
};

export default ProductTable;