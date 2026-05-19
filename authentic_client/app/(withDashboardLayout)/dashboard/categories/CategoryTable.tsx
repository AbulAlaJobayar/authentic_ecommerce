/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Papa from "papaparse";

import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  SquarePen,
  ArrowUpDown,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Checkbox } from "@/components/ui/checkbox";

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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";

// =====================================
// TYPES
// =====================================

type Product = {
  id: number;
  image: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  status: string;
};

// =====================================
// DUMMY DATA
// =====================================

const initialProducts: Product[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    name: "Casual Sunglass",
    category: "Sunglass",
    stock: 124,
    price: 47,
    status: "Published",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    name: "T-Shirt",
    category: "Clothes",
    stock: 20,
    price: 55,
    status: "Published",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc",
    name: "Green Tea",
    category: "Beauty",
    stock: 0,
    price: 99,
    status: "Inactive",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1523398002811-999ca8dec234",
    name: "Denim Shirt",
    category: "Clothes",
    stock: 5,
    price: 75,
    status: "Draft",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    name: "Nike Shoe",
    category: "Shoes",
    stock: 12,
    price: 120,
    status: "Published",
  },
];

// =====================================
// PAGE
// =====================================

const ProductsPage = () => {
  // =====================================
  // STATES
  // =====================================

  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(5);

  const [selectedRows, setSelectedRows] =
    useState<number[]>([]);

  const [sortOrder, setSortOrder] = useState<
    "asc" | "desc"
  >("asc");

  const [open, setOpen] = useState(false);

  const [editProduct, setEditProduct] =
    useState<Product | null>(null);

  // =====================================
  // FILTERED PRODUCTS
  // =====================================

  const filteredProducts = useMemo(() => {
    let data = [...products];

    // SEARCH
    data = data.filter((item) =>
      item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    // STATUS
    if (statusFilter !== "all") {
      data = data.filter(
        (item) => item.status === statusFilter
      );
    }

    // CATEGORY
    if (categoryFilter !== "all") {
      data = data.filter(
        (item) =>
          item.category === categoryFilter
      );
    }

    // SORT
    data.sort((a, b) =>
      sortOrder === "asc"
        ? a.price - b.price
        : b.price - a.price
    );

    return data;
  }, [
    products,
    searchTerm,
    statusFilter,
    categoryFilter,
    sortOrder,
  ]);

  // =====================================
  // PAGINATION
  // =====================================

  const total = filteredProducts.length;

  const totalPage = Math.ceil(total / limit);

  const start = (page - 1) * limit;

  const end = start + limit;

  const paginatedProducts =
    filteredProducts.slice(start, end);

  // =====================================
  // SELECT ALL
  // =====================================

  const handleSelectAll = (
    checked: boolean
  ) => {
    if (checked) {
      setSelectedRows(
        paginatedProducts.map(
          (item) => item.id
        )
      );
    } else {
      setSelectedRows([]);
    }
  };

  // =====================================
  // SELECT SINGLE
  // =====================================

  const handleSelectRow = (
    id: number,
    checked: boolean
  ) => {
    if (checked) {
      setSelectedRows((prev) => [
        ...prev,
        id,
      ]);
    } else {
      setSelectedRows((prev) =>
        prev.filter((item) => item !== id)
      );
    }
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = (id: number) => {
    setProducts((prev) =>
      prev.filter((item) => item.id !== id)
    );

    toast.success("Product deleted");
  };

  // =====================================
  // EXPORT CSV
  // =====================================

  const handleExport = () => {
    const csv = Papa.unparse(products);

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "products.csv";

    link.click();

    toast.success("CSV Exported");
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (product: Product) => {
    setEditProduct(product);

    setOpen(true);
  };

  // =====================================
  // UPDATE
  // =====================================

  const handleUpdate = () => {
    if (!editProduct) return;

    setProducts((prev) =>
      prev.map((item) =>
        item.id === editProduct.id
          ? editProduct
          : item
      )
    );

    toast.success(
      "Product updated successfully"
    );

    setOpen(false);
  };

  return (
    <div className="p-4 md:p-6">
      <Card className="rounded-3xl border-none shadow-sm">
        <CardContent className="space-y-6 p-4 md:p-6">
          {/* ===================================== */}
          {/* HEADER */}
          {/* ===================================== */}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="space-y-2">
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
                Products List
              </h1>
            </div>

            {/* RIGHT */}
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleExport}
              >
                <Download size={16} />
                Export
              </Button>

              <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                <Plus size={16} />
                Add Product
              </Button>
            </div>
          </div>

          {/* ===================================== */}
          {/* FILTERS */}
          {/* ===================================== */}

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {/* SEARCH */}
            <div className="relative w-full xl:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(
                    e.target.value
                  );

                  setPage(1);
                }}
              />
            </div>

            {/* FILTERS */}
            <div className="flex flex-wrap gap-3">
              {/* STATUS */}
              <Select
                value={statusFilter}
                onValueChange={
                  setStatusFilter
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All Status
                  </SelectItem>

                  <SelectItem value="Published">
                    Published
                  </SelectItem>

                  <SelectItem value="Draft">
                    Draft
                  </SelectItem>

                  <SelectItem value="Inactive">
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* CATEGORY */}
              <Select
                value={categoryFilter}
                onValueChange={
                  setCategoryFilter
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    All Category
                  </SelectItem>

                  <SelectItem value="Clothes">
                    Clothes
                  </SelectItem>

                  <SelectItem value="Beauty">
                    Beauty
                  </SelectItem>

                  <SelectItem value="Shoes">
                    Shoes
                  </SelectItem>
                </SelectContent>
              </Select>

              {/* FILTER BUTTON */}
              <Button
                variant="outline"
                className="gap-2"
              >
                <Filter size={16} />
                Filter
              </Button>
            </div>
          </div>

          {/* ===================================== */}
          {/* TABLE */}
          {/* ===================================== */}

          <div className="overflow-hidden rounded-2xl border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* CHECKBOX */}
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          selectedRows.length ===
                            paginatedProducts.length &&
                          paginatedProducts.length >
                            0
                        }
                        onCheckedChange={(
                          checked
                        ) =>
                          handleSelectAll(
                            checked as boolean
                          )
                        }
                      />
                    </TableHead>

                    {/* PRODUCT */}
                    <TableHead>
                      Product Name
                    </TableHead>

                    {/* CATEGORY */}
                    <TableHead>
                      Category
                    </TableHead>

                    {/* STOCK */}
                    <TableHead>
                      Stock
                    </TableHead>

                    {/* PRICE */}
                    <TableHead>
                      <button
                        onClick={() =>
                          setSortOrder(
                            (
                              prev
                            ) =>
                              prev ===
                              "asc"
                                ? "desc"
                                : "asc"
                          )
                        }
                        className="flex items-center gap-2"
                      >
                        Price

                        <ArrowUpDown
                          size={16}
                        />
                      </button>
                    </TableHead>

                    {/* STATUS */}
                    <TableHead>
                      Status
                    </TableHead>

                    {/* ACTION */}
                    <TableHead>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedProducts.length >
                  0 ? (
                    paginatedProducts.map(
                      (item) => (
                        <TableRow
                          key={item.id}
                        >
                          {/* CHECKBOX */}
                          <TableCell>
                            <Checkbox
                              checked={selectedRows.includes(
                                item.id
                              )}
                              onCheckedChange={(
                                checked
                              ) =>
                                handleSelectRow(
                                  item.id,
                                  checked as boolean
                                )
                              }
                            />
                          </TableCell>

                          {/* PRODUCT */}
                          <TableCell>
                            <div className="flex min-w-[220px] items-center gap-3">
                              <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                                <Image
                                  src={
                                    item.image
                                  }
                                  alt={
                                    item.name
                                  }
                                  fill
                                  className="object-cover"
                                />
                              </div>

                              <span className="font-medium">
                                {
                                  item.name
                                }
                              </span>
                            </div>
                          </TableCell>

                          {/* CATEGORY */}
                          <TableCell>
                            {
                              item.category
                            }
                          </TableCell>

                          {/* STOCK */}
                          <TableCell>
                            <span
                              className={`text-sm font-medium ${
                                item.stock ===
                                0
                                  ? "text-red-500"
                                  : item.stock <
                                    10
                                  ? "text-yellow-500"
                                  : "text-green-600"
                              }`}
                            >
                              {item.stock}
                            </span>
                          </TableCell>

                          {/* PRICE */}
                          <TableCell>
                            $
                            {
                              item.price
                            }
                          </TableCell>

                          {/* STATUS */}
                          <TableCell>
                            <Badge
                              className={`rounded-full px-3 py-1 font-medium ${
                                item.status ===
                                "Published"
                                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                                  : item.status ===
                                    "Inactive"
                                  ? "bg-red-100 text-red-600 hover:bg-red-100"
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                              }`}
                            >
                              {
                                item.status
                              }
                            </Badge>
                          </TableCell>

                          {/* ACTION */}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                >
                                  <MoreHorizontal
                                    size={
                                      18
                                    }
                                  />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleEdit(
                                      item
                                    )
                                  }
                                >
                                  <SquarePen className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  className="text-red-500"
                                  onClick={() =>
                                    handleDelete(
                                      item.id
                                    )
                                  }
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-10 text-center"
                      >
                        No Products Found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* ===================================== */}
          {/* PAGINATION */}
          {/* ===================================== */}

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT */}
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">
                Showing {start + 1}-
                {Math.min(end, total)} of{" "}
                {total}
              </p>

              <Select
                value={String(limit)}
                onValueChange={(value) =>
                  setLimit(Number(value))
                }
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="5">
                    5
                  </SelectItem>

                  <SelectItem value="10">
                    10
                  </SelectItem>

                  <SelectItem value="20">
                    20
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* RIGHT */}
            <Pagination className="justify-start lg:justify-end">
              <PaginationContent>
                {/* PREVIOUS */}
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();

                      if (page > 1) {
                        setPage(
                          (prev) =>
                            prev - 1
                        );
                      }
                    }}
                  />
                </PaginationItem>

                {/* PAGE */}
                {Array.from({
                  length: totalPage,
                }).map((_, index) => (
                  <PaginationItem
                    key={index}
                  >
                    <PaginationLink
                      isActive={
                        page ===
                        index + 1
                      }
                      onClick={(e) => {
                        e.preventDefault();

                        setPage(
                          index + 1
                        );
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* NEXT */}
                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();

                      if (
                        page <
                        totalPage
                      ) {
                        setPage(
                          (prev) =>
                            prev + 1
                        );
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* EDIT MODAL */}
      {/* ===================================== */}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Edit Product
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* NAME */}
            <Input
              placeholder="Product Name"
              value={
                editProduct?.name || ""
              }
              onChange={(e) =>
                setEditProduct(
                  (prev) =>
                    ({
                      ...prev!,
                      name: e.target.value,
                    } as Product)
                )
              }
            />

            {/* PRICE */}
            <Input
              type="number"
              placeholder="Price"
              value={
                editProduct?.price || 0
              }
              onChange={(e) =>
                setEditProduct(
                  (prev) =>
                    ({
                      ...prev!,
                      price: Number(
                        e.target.value
                      ),
                    } as Product)
                )
              }
            />

            {/* STOCK */}
            <Input
              type="number"
              placeholder="Stock"
              value={
                editProduct?.stock || 0
              }
              onChange={(e) =>
                setEditProduct(
                  (prev) =>
                    ({
                      ...prev!,
                      stock: Number(
                        e.target.value
                      ),
                    } as Product)
                )
              }
            />

            {/* SAVE */}
            <Button
              onClick={handleUpdate}
              className="w-full"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;