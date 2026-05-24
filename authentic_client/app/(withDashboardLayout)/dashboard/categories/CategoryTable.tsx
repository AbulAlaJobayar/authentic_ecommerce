/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";



import { Button } from "@/components/ui/button";

import { ChevronDown, ChevronUp, Loader2, SquarePen } from "lucide-react";

import { Trash2Icon } from "@animateicons/react/lucide";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { useState } from "react";
import ATSModal from "@/components/shared/Modal/ATSModal";
import EditCategories from "./EditCategories";
import DeleteWarehouse from "../warehouse/DeleteWartehouse";
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

const CategoryTable= ({
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

    // Edit
    // =========================
    const handleEdit = (id: any) => {
        setOpen(true);
        setEditedId(id);
    };

    // =========================
    // Delete
    // =========================
    const handleDelete = (id: any) => {
        setIsDeleteOpen(true);
        setDeletedId(id);
    };
    // =========================
    // Image Checker
    // =========================
    const isImageUrl = (val: unknown): boolean => {
        if (typeof val !== "string") return false;

        return (
            val.startsWith("http") ||
            val.startsWith("/") ||
            /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val)
        );
    };

    // =========================
    // Loading
    // =========================
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-10">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="rounded-xl border">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((column) => (
                            <TableHead
                                key={column.key}
                            >



                                <div className="flex items-center gap-2">
                                    {column.label}

                                    {sortBy === column.key && (
                                        <span className="cursor-pointer font-bold "
                                            onClick={() => onSort?.(column.key)}>
                                            {sortOrder === "desc" ? (<ChevronDown />) : (<ChevronUp />)}
                                        </span>
                                    )}
                                </div>

                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data?.length > 0 ? (
                        data.map((item) => (
                            <TableRow key={item.id}>
                                {columns.map((column) => {
                                    const value = item[column.key];

                                    return (
                                        <TableCell key={column.key}>
                                            {/* Image */}
                                            {isImageUrl(value) ? (
                                                <Image
                                                    src={value}
                                                    alt="table-image"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-md object-cover"
                                                />
                                            )

                                                : column.key === "createdAt" ? (
                                                    <span>{moment(value).format('ll')}</span>
                                                )
                                                    : column.key === "isDeleted" ? (
                                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${value ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                            {value ? "Deleted" : "Active"}
                                                        </span>
                                                    )

                                                        : column.key === "id" ? (
                                                            <div className="flex items-center gap-3">
                                                                <Button size="icon" variant="outline"
                                                                    onClick={() => handleEdit(value)}
                                                                >
                                                                    <SquarePen size={18} />
                                                                </Button>

                                                                <Button size="icon" variant="destructive"
                                                                    onClick={() => handleDelete(value)}
                                                                >
                                                                    <Trash2Icon size={18} />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <span>{String(value ?? "")}</span>
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
                                className="text-center py-10"
                            >
                                No Data Found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Edit Modal */}
            <ATSModal open={open} setOpen={setOpen} title="Edit Categories">
                <EditCategories setOpen={setOpen} id={editedId} />
            </ATSModal>

            {/* Delete Modal */}
            <DeleteWarehouse
                id={deletedId}
                open={isDeleteOpen}
                setOpen={setIsDeleteOpen}
            />
        </div>
    );
};

export default CategoryTable;