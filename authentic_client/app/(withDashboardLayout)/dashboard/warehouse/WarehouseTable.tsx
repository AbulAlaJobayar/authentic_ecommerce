// "use client"
// import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import Image from 'next/image';
// import { Button } from '@/components/ui/button';
// import { SquarePen } from 'lucide-react';
// import { Trash2Icon } from '@animateicons/react/lucide';
// import ATSModal from '@/components/shared/Modal/ATSModal';
// import { useState } from 'react';
// import { ProductRow, TableColumn } from './page';
// import EditWarehouse from './EditedWarehouse';
// import DeleteWarehouse from './DeleteWartehouse';

// type CategoryTableProps = {
//     columns: TableColumn<ProductRow>[];
//     data: ProductRow[];
// };

// const WarehouseTable = (data: CategoryTableProps) => {
//     const [open, setOpen] = useState(false);
//     const [editedId,setEditedId]=useState("")
//     const [isDeleteOpen, setIsDeleteOpen] = useState(false)
//     const [deletedId, setDeletedId] = useState("")

 
//     const handleEdit = async(id: string) => {
//         setOpen(true)
//         setEditedId(id)
//     }
//     const handleDelete = async(id: string) => {
//         setIsDeleteOpen(true)
//         setDeletedId(id)
//         console.log(id)
//     }

//     return (
//         <div>
//             <Table>
//                 <TableCaption>A list of your recent invoices.</TableCaption>
//                 <TableHeader>
//                     <TableRow>
//                         {
//                             data?.columns?.map((h) => (
//                                 <TableHead key={h.key}>
//                                     {h.label}</TableHead>
//                             ))
//                         }
//                     </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                     {data?.data?.map((invoice) => (
//                         <TableRow key={invoice.id}>
//                             {data?.columns?.map((col) => (
//                                 <TableCell key={col.key}>

//                                     {(() => {
//                                         const value = invoice[col.key];

//                                         // Check if value is an image URL
//                                         const isImageUrl = (val: unknown): boolean => {
//                                             if (typeof val !== 'string') return false;
//                                             return (
//                                                 val.startsWith('http') ||
//                                                 val.startsWith('/') ||
//                                                 /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val)
//                                             );
//                                         };

//                                         if (isImageUrl(value)) {
//                                             return (
//                                                 <Image
//                                                     src={String(value)}
//                                                     alt="table cell image"
//                                                     width={40}
//                                                     height={40}
//                                                     className="rounded-full object-cover"
//                                                 />
//                                             );
//                                         }

//                                         if (col.key === 'action') {
//                                             return <>
//                                                 <div className='flex justify-center gap-10'>

//                                                     <Button
//                                                         type="button"
//                                                         variant="outline"
//                                                         onClick={() => handleEdit(invoice.id)}
                                                
//                                                     >
//                                                         <SquarePen />
//                                                     </Button>
//                                                     <Button variant="destructive" onClick={() => handleDelete(invoice.id)}>
//                                                         <Trash2Icon size={24} />
//                                                     </Button>
//                                                 </div >
//                                             </>

//                                         }

//                                         return <span >{String(value ?? '')}</span>;
//                                     })()}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//             <ATSModal open={open} setOpen={setOpen} title='Edit Categories'

//             >
//                 <EditWarehouse setOpen={setOpen} id={editedId} />
//             </ATSModal>
//                <DeleteWarehouse id={deletedId} open={isDeleteOpen} setOpen={setIsDeleteOpen} />
//         </div>
//     );
// };

// export default WarehouseTable;
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import { Trash2Icon } from "@animateicons/react/lucide";
import ATSModal from "@/components/shared/Modal/ATSModal";
import { useMemo, useState } from "react";
import { ProductRow, TableColumn } from "./page";
import EditWarehouse from "./EditedWarehouse";
import DeleteWarehouse from "./DeleteWartehouse";

type CategoryTableProps = {
  columns: TableColumn<ProductRow>[];
  data: ProductRow[];
};

const ITEMS_PER_PAGE = 5;

const WarehouseTable = ({ columns, data }: CategoryTableProps) => {
  const [open, setOpen] = useState(false);
  const [editedId, setEditedId] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const [search, setSearch] = useState("");

  const [sortKey, setSortKey] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] = useState(1);

  // =========================
  // Edit
  // =========================
  const handleEdit = (id: string) => {
    setOpen(true);
    setEditedId(id);
  };

  // =========================
  // Delete
  // =========================
  const handleDelete = (id: string) => {
    setIsDeleteOpen(true);
    setDeletedId(id);
  };

  // =========================
  // Sorting
  // =========================
  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // =========================
  // Filtering
  // =========================
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // =========================
  // Sorting Data
  // =========================
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = String(a[sortKey as keyof ProductRow] ?? "");
      const bValue = String(b[sortKey as keyof ProductRow] ?? "");

      if (sortOrder === "asc") {
        return aValue.localeCompare(bValue);
      }

      return bValue.localeCompare(aValue);
    });
  }, [filteredData, sortKey, sortOrder]);

  // =========================
  // Pagination
  // =========================
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return sortedData.slice(start, end);
  }, [sortedData, currentPage]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search..."
          className="max-w-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <Table>
        <TableCaption>Warehouse List</TableCaption>

        <TableHeader>
          <TableRow>
            {columns?.map((h) => (
              <TableHead
                key={h.key}
                className="cursor-pointer"
                onClick={() => handleSort(String(h.key))}
              >
                <div className="flex items-center gap-2">
                  {h.label}

                  {sortKey === h.key && (
                    <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedData?.map((invoice) => (
            <TableRow key={invoice.id}>
              {columns?.map((col) => (
                <TableCell key={String(col.key)}>
                  {(() => {
                    const value = invoice[col.key];

                    // Image check
                    const isImageUrl = (val: unknown): boolean => {
                      if (typeof val !== "string") return false;

                      return (
                        val.startsWith("http") ||
                        val.startsWith("/") ||
                        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val)
                      );
                    };

                    // Image
                    if (isImageUrl(value)) {
                      return (
                        <Image
                          src={String(value)}
                          alt="table cell image"
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                      );
                    }

                    // Action
                    if (col.key === "action") {
                      return (
                        <div className="flex justify-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleEdit(invoice.id)}
                          >
                            <SquarePen />
                          </Button>

                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(invoice.id)}
                          >
                            <Trash2Icon size={20} />
                          </Button>
                        </div>
                      );
                    }

                    return <span>{String(value ?? "")}</span>;
                  })()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <span className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </span>

        <Button
          variant="outline"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>

      {/* Edit Modal */}
      <ATSModal open={open} setOpen={setOpen} title="Edit Categories">
        <EditWarehouse setOpen={setOpen} id={editedId} />
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

export default WarehouseTable;