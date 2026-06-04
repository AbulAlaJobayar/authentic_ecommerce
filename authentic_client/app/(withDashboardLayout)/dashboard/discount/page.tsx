
"use client";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import ATSModal from "@/components/shared/Modal/ATSModal";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

// import {
//     Tabs,
//     TabsList,
//     TabsTrigger,
// } from "@/components/ui/tabs";

// import Papa from "papaparse";
import { useAllDiscountQuery } from "@/redux/api/discountApi";
import DiscountTable from "./DiscountTable";
import AddDiscount from "./AddDiscount";


export type TDiscountRow = {
    id: string;
    name: string;
    image: string[];
    code?: string;
    createdAt: Date;

    isDeleted: boolean;
    active: boolean;
    percentage: number;

    startDate: Date;
    endDate: Date;
};
export type TableColumn<T> = {
    key: keyof T;
    label: string;
};

const columns: TableColumn<TDiscountRow>[] = [
  { key: "name", label: "Name" },
  { key: "code", label: "Code" },
  { key: "percentage", label: "Discount (%)" },
  { key: "active", label: "Active" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  { key: "createdAt", label: "Created" },
  { key: "id", label: "Action" },
];



const DiscountPage = () => {
    // =========================
    // States
    // =========================
    const [page, setPage] = useState(1);
    const [limit] = useState(10);

    // const [searchTerm, setSearchTerm] = useState("");

    const [sortBy] = useState("createdAt");

    const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
        "desc"
    );

    // const [status, setStatus] = useState("all");
    const [open, setOpen] = useState(false);
    // const [exporting] = useState(false);

    // =========================


    // =========================
    // export fun
    // =========================
    // const handleExport = () => {
    //     const csv = Papa.unparse(
    //         discount.map((item: any) => ({
    //             name: item.name,
    //             status: item.isDeleted ? "Deleted" : "Active",
    //             createdAt: item.createdAt,
    //         }))
    //     );

    //     const blob = new Blob([csv], {
    //         type: "text/csv;charset=utf-8;",
    //     });

    //     const url = URL.createObjectURL(blob);

    //     const link = document.createElement("a");

    //     link.href = url;
    //     link.download = "warehouses.csv";

    //     link.click();
    // };
    // =========================
    // Query
    // =========================
    const { data, isLoading, isFetching } =
        useAllDiscountQuery({});

    // =========================
    // Data
    // =========================
    const discount = data?.data || [];
    const meta = data?.data?.meta || {};
console.log(discount, "discount")
    // =========================
    // Pagination Data
    // =========================
    const start = (page - 1) * limit + 1;

    const end = Math.min(page * limit, meta?.total || 0);

    return (
        <div className="space-y-6 p-6">
            {/* ================= HEADER ================= */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Left */}
                <div className="space-y-3">
                    {/* Breadcrumb */}
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />

                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                   Discount
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Discount
                        </h1>

                        <p className="text-muted-foreground mt-1">
                            Manage all your discount here.
                        </p>
                    </div>
                </div>

                {/* Right */}
                <Button
                    onClick={() => setOpen(true)}
                    className="gap-2"
                >
                    <SquarePen size={18} />
                    Add discount
                </Button>
            </div>

            {/* ================= FILTER TABS =================
            <Tabs
                value={status}
                onValueChange={(value) => {
                    setStatus(value);
                    setPage(1);
                }}
            >
                <TabsList>
                    <TabsTrigger value="all">
                        All
                    </TabsTrigger>

                    <TabsTrigger value="false">
                        Active
                    </TabsTrigger>

                    <TabsTrigger value="true">
                        Deleted
                    </TabsTrigger>
                </TabsList>
            </Tabs> */}

            {/* ================= TOOLBAR ================= */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Search */}
                {/* <Input
                    placeholder="Search Warehouses..."
                    className="md:max-w-sm"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setPage(1);
                    }}
                /> */}

                {/* Export */}
                {/* <Button
                    variant="outline"
                    onClick={handleExport}
                    disabled={exporting}
                >
                    <Download size={18} />
                    {exporting ? "Exporting..." : "Export"}
                </Button> */}
            </div>

            {/* ================= TABLE ================= */}
            <DiscountTable
                columns={columns}
                data={discount}
                isLoading={isLoading || isFetching}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={() =>
                    setSortOrder((prev) =>
                        prev === "asc" ? "desc" : "asc"
                    )
                }
            />

            {/* ================= PAGINATION ================= */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Results */}
                <p className="text-sm text-muted-foreground">
                    Showing {start} - {end} of{" "}
                    {meta?.total || 0} results
                </p>

                {/* Pagination */}
                <Pagination className="justify-end">
                    <PaginationContent>
                        {/* Previous */}
                        <PaginationItem>
                            <PaginationPrevious

                                onClick={(e) => {
                                    e.preventDefault();

                                    if (page > 1) {
                                        setPage((prev) => prev - 1);
                                    }
                                }}
                            />
                        </PaginationItem>

                        {/* Dynamic Pages */}
                        {Array.from({
                            length: meta?.totalPage || 1,
                        }).map((_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink

                                    isActive={page === index + 1}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPage(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Next */}
                        <PaginationItem>
                            <PaginationNext

                                onClick={(e) => {
                                    e.preventDefault();

                                    if (page < meta?.totalPage) {
                                        setPage((prev) => prev + 1);
                                    }
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* ================= MODAL ================= */}
            <ATSModal
                open={open}
                setOpen={setOpen}
                title="Add Warehouse"
            >
                <AddDiscount
                    setOpen={setOpen}
                    open={open}
                />
            </ATSModal>
        </div>
    );
};

export default DiscountPage;