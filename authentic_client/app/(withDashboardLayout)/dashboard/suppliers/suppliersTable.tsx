/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Loader2, SquarePen } from "lucide-react";
import { Trash2Icon } from "@animateicons/react/lucide";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import moment from "moment";
import { useState } from "react";
import ATSModal from "@/components/shared/Modal/ATSModal";
import EditSuppliers from "./EditSuppliers";
import DeleteSuppliers from "./DeleteSuppliers";
import ActiveSuppliers from "./ActiveSupplier";
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

const SuppliersTable = ({
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
    const [activeId, setActiveId] = useState("");
    const [isActive, setIsActive] = useState(false);

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
    // Active
    // =========================
    const handleActive = (id: any) => {
        setActiveId(id);
        setIsActive(true);
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
                                            {column.key === "createdAt" ? (
                                                <span>{moment(value).format('ll')}</span>
                                            )
                                                : column.key === "isDeleted" ? (
                                                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${value ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                                        {value ? "Deleted" : "Active"}
                                                    </span>
                                                )

                                                    : column.key === "id" ? (
                                                        <div className="flex items-center gap-3">
                                                            <Button size="icon" variant="outline" disabled={item.isDeleted === true}
                                                                onClick={() => handleEdit(value)}
                                                            >
                                                                <SquarePen size={18} />
                                                            </Button>

                                                            {item.isDeleted === false ? (
                                                                <Button size="icon" variant="destructive"
                                                                    disabled={item.isDeleted === true}
                                                                    onClick={() => handleDelete(value)}
                                                                >
                                                                    <Trash2Icon size={18} />
                                                                </Button>
                                                            ) : (
                                                                <Button size="icon" onClick={() => handleActive(value)} variant="outline" className="px-7 bg-green-100 text-green-800 ">
                                                                    Active
                                                                </Button>
                                                            )}
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
                <EditSuppliers setOpen={setOpen} id={editedId} />
            </ATSModal>

            {/* Delete Modal */}
            <DeleteSuppliers
                id={deletedId}
                open={isDeleteOpen}
                setOpen={setIsDeleteOpen}
            />
            {/* Active Modal */}
            <ActiveSuppliers
                id={activeId}
                open={isActive}
                setOpen={setIsActive}
            />
         
        </div>
    );
};

export default SuppliersTable;