/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useState } from "react";
import {
  Download,
  Filter,
  Plus,
  Search,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAllCategoryQuery } from "@/redux/api/categorieApi";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import InventoryTable from "./InventoryTable";
import MetricCard from "./MetricCard";
import { useGetAllInventoryQuery } from "@/redux/api/inventory";
// ======================
// TYPES
// ======================

export type Supplier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Warehouse = {
  id: string;
  name: string;
  address: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  image?: string;
  isDeleted?: boolean;
  createdAt?: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  description: string;
  image: string[];
  status: "ACTIVE" | "DRAFT" | "DISCONTINUED";
  sellingPrice: number;

  category: Category;

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductBatch = {
  id: string;

  batchNumber: string;

  expiryDate: string;

  quantity: number;

  isDeleted: boolean;

  buyingPrice: number;

  costPrice: number;

  sellingPrice: number;

  shelfCode: string;

  rackCode: string;

  supplier: Supplier;

  warehouse: Warehouse;

  createdAt: string;

  updatedAt: string;
};

export type InventoryRow = {
  id: string;

  quantity: number;

  alertQuantity: number;

  isDeleted: boolean;

  createdAt: string;

  updatedAt: string;

  product: Product;

  productBatch: ProductBatch[];
};



export type TableColumn<T> = {
  key: keyof T | string;
  label: string;
};

// ======================
// TABLE COLUMNS
// =====================

const columns: TableColumn<InventoryRow>[] = [
  // PRODUCT
  { key: "product.image", label: "Image" },
  { key: "product.name", label: "Product" },
  { key: "product.sku", label: "SKU" },
  { key: "product.category", label: "Category" },
  { key: "quantity", label: "Stock Qty" },
  { key: "alertQuantity", label: "Alert Qty" },
  { key: "product.sellingPrice", label: "Product Price" },
  { key: "product.status", label: "Status" },
  { key: "id", label: "Actions" },
];


// ======================
// COMPONENT
// ======================

const InventoryPageContent = () => {

  // ======================
  // STATES
  // ======================

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    string | undefined
  >(undefined);

  const [categoryId, setCategoryId] = useState("");

  // ======================
  // DEBOUNCE SEARCH
  // ======================

  const [debouncedSearch] = useDebounce(search, 500);

  // ======================
  // API CALLS
  // ======================



  const {
    data,
    isLoading,
    isError,
  } = useGetAllInventoryQuery({
    page,
    limit,
    searchTerm: debouncedSearch,
    status,
    categoryId,
  });
console.log(data?.data?.statistics
)

  const { data: categoriesData } =
    useAllCategoryQuery({});

  // ======================
  // DATA
  // ======================

  const products = data?.data || [];
  const meta = data?.meta || {};

  // ======================
  // RESET FILTERS
  // ======================

  const handleResetFilters = () => {
    setSearch("");
    setStatus(undefined);
    setCategoryId("");
    setPage(1);
  };




  // ======================
  // LOADING
  // ======================

  if (isLoading) {
    return (
      <div className="p-10 text-center text-sm text-muted-foreground">
        Loading products...
      </div>
    );
  }

  // ======================
  // ERROR
  // ======================

  if (isError) {
    return (
      <div className="p-10 text-center text-red-500">
        Failed to load products.
      </div>
    );
  }

  // ======================
  // JSX
  // ======================

  return (
    <div className="w-full">

      <Card className="rounded-3xl border-none shadow-sm">

        <CardContent className="space-y-6 p-4 md:p-6">

          {/* ================= HEADER ================= */}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>
                      Products List
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <h1 className="text-2xl font-bold">
                Products
              </h1>

            </div>

            <div className="flex flex-wrap gap-3">

              <Button variant="outline">
                <Download size={16} />
                Import
              </Button>

              <Button variant="outline">
                <Download size={16} />
                Export
              </Button>
              <Link href="/dashboard/product/addProduct">
                <Button className="bg-violet-600 hover:bg-violet-700">
                  <Plus size={16} />
                  Add Product
                </Button>
                </Link>

            </div>

          </div>
          

{/* =============== METRIC CARDS =============== */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 mx-auto">
        <MetricCard
          label="Total SKUs"
          value={data?.data?.statistics?.totalSKUs}
          sub={`${data?.data?.statistics?.activeProducts} active`}
        />
        <MetricCard
          label="Low stock"
          value={data?.data?.statistics?.lowStock}
          sub="below threshold"
          valueClass="text-amber-600"
        />
        <MetricCard
          label="Out of stock"
          value={data?.data?.statistics?.outOfStock}
          sub="need restocking"
          valueClass="text-red-500"
        />
        <MetricCard
          label="Inventory value"
          value={`$${Math.round(data?.data?.statistics?.inventoryValue).toLocaleString()}`}
          sub="at selling price"
        />
      </div>


          {/* ================= FILTERS ================= */}

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            {/* SEARCH */}

            <div className="relative w-full xl:max-w-sm">

              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search products..."
                className="pl-10"
              />

            </div>

            {/* FILTERS */}

            <div className="flex flex-wrap gap-3">

              {/* STATUS */}

              <Select
                value={status}
                onValueChange={(value) => {
                  setStatus(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ACTIVE">
                    Active
                  </SelectItem>

                  <SelectItem value="DRAFT">
                    Draft
                  </SelectItem>

                  <SelectItem value="DISCONTINUED">
                    Discontinued
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* CATEGORY */}

              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>

                  {categoriesData?.data?.data?.map(
                    (category: any) => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    )
                  )}

                </SelectContent>
              </Select>

              {/* RESET */}

              <Button
                variant="outline"
                onClick={handleResetFilters}
              >
                <Filter size={16} />
                Reset
              </Button>

            </div>

          </div>

          {/* ================= TABLE ================= */}

          <InventoryTable
            columns={columns}
            data={products?.data}
            isLoading={isLoading}
          />

          {/* ================= FOOTER ================= */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* META */}

            <div className="space-y-1">

              <p className="text-sm text-muted-foreground">
                Showing page{" "}
                <span className="font-medium">
                  {meta?.page || 1}
                </span>{" "}
                of{" "}
                <span className="font-medium">
                  {meta?.totalPage || 1}
                </span>
              </p>

              <p className="text-sm text-muted-foreground">
                Total Products:{" "}
                <span className="font-medium">
                  {meta?.total || 0}
                </span>
              </p>

            </div>

            {/* PAGINATION */}

            <Pagination>

              <PaginationContent>

                {/* PREVIOUS */}

                <PaginationItem>

                  <PaginationPrevious
                    onClick={() =>
                      setPage((prev) =>
                        Math.max(prev - 1, 1)
                      )
                    }
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />

                </PaginationItem>

                {/* PAGE NUMBERS */}

                {Array.from(
                  {
                    length:
                      meta?.totalPage || 1,
                  },
                  (_, index) => {

                    const pageNumber = index + 1;

                    return (
                      <PaginationItem
                        key={pageNumber}
                      >
                        <PaginationLink
                          isActive={
                            page === pageNumber
                          }
                          onClick={() =>
                            setPage(pageNumber)
                          }
                          className="cursor-pointer"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}

                {/* NEXT */}

                <PaginationItem>

                  <PaginationNext
                    onClick={() =>
                      setPage((prev) =>
                        prev <
                          (meta?.totalPage || 1)
                          ? prev + 1
                          : prev
                      )
                    }
                    className={
                      page === meta?.totalPage
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />

                </PaginationItem>

              </PaginationContent>

            </Pagination>

          </div>

        </CardContent>

      </Card>

    </div>
  );
};

export default InventoryPageContent;
 