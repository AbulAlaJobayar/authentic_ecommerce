/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";


// import { useState } from "react";

// import {
//   ChevronDown,
//   Download,
//   Filter,
//   MoreHorizontal,
//   Plus,
//   Search,
// } from "lucide-react";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbList,
//   BreadcrumbPage,
// } from "@/components/ui/breadcrumb";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { CategoryRow } from "../../categories/page";
// import ProductTable from "./ProductTable";
// import { useGetAllProductsQuery } from "../../../../../redux/api/productApi";
// import { useAllCategoryQuery } from "@/redux/api/categorieApi";


// export type ProductRow = {
//   id: string;
//   name: string;
//   sku: string;
//   image: string[];
//   status: string;
//   sellingPrice: number;
//   category: CategoryRow[];
//   action: string;
//   createdAt: Date;
//   isDeleted: boolean;

// };

// export type TableColumn<T> = {
//   key: keyof T;
//   label: string;
// };

// const columns: TableColumn<ProductRow>[] = [
//   { key: "image", label: "Image" },
//   { key: "name", label: "Name" },
//   { key: "sku", label: "SKU" },
//   { key: "sellingPrice", label: "Price" },
//   { key: "category", label: "Category" },
//   { key: "isDeleted", label: "Status" },
//   { key: "createdAt", label: "Created" },
//   { key: "id", label: "Action" },]
//   ;


// const ProductsPage = () => {
//   // ======================
//   // STATE
//   // ======================
//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState(undefined);
//   const [categoryId, setCategoryId] = useState("");
//   const [selected, setSelected] = useState<number[]>([]);

//   // ======================
//   // API CALL (RTK Query)
//   // ======================
//   const { data, isLoading, isError } = useGetAllProductsQuery({
//     page,
//     limit,
//     search,
//     status,
//     categoryId
//   });
//   const {data: categoriesData} = useAllCategoryQuery({});

//     const products = data?.data?.data || [];
//     const meta = data?.data?.meta || {};
// console.log(categoriesData?.data?.data,"categoriesData")
//   // ======================
//   // HANDLERS
//   // ======================
//   const toggleSelect = (id: number) => {
//     setSelected((prev) =>
//       prev.includes(id)
//         ? prev.filter((i) => i !== id)
//         : [...prev, id]
//     );
//   };

//   const toggleSelectAll = () => {
//     if (selected.length === products.length) {
//       setSelected([]);
//     } else {
//       setSelected(products.map((p: any) => p.id));
//     }
//   };

//   // ======================
//   // UI STATES
//   // ======================
//   if (isLoading) {
//     return (
//       <div className="p-6 text-center text-sm text-muted-foreground">
//         Loading products...
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="p-6 text-center text-red-500">
//         Failed to load products.
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <Card className="rounded-3xl border-none shadow-sm">
//         <CardContent className="space-y-6 p-4 md:p-6">

//           {/* ================= HEADER ================= */}
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div>
//               <Breadcrumb>
//                 <BreadcrumbList>
//                   <BreadcrumbItem>
//                     <BreadcrumbPage>Products List</BreadcrumbPage>
//                   </BreadcrumbItem>
//                 </BreadcrumbList>
//               </Breadcrumb>

//               <h1 className="text-2xl font-bold">Products</h1>
//             </div>

//             <div className="flex flex-wrap gap-3">
//               <Button variant="outline">
//                 <Download size={16} /> Import
//               </Button>

//               <Button variant="outline">
//                 <Download size={16} /> Export
//               </Button>

//               <Button className="bg-violet-600 hover:bg-violet-700">
//                 <Plus size={16} /> Add Product
//               </Button>
//             </div>
//           </div>

//           {/* ================= FILTERS ================= */}
//           <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

//             {/* SEARCH */}
//             <div className="relative w-full xl:max-w-sm">
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//               <Input
//                 value={search}
//                 onChange={(e) => {
//                   setSearch(e.target.value);
//                   setPage(1);
//                 }}
//                 placeholder="Search products..."
//                 className="pl-10"
//               />
//             </div>

//             <div className="flex flex-wrap gap-3">

//               {/* STATUS */}
//               <Select onValueChange={(val) => setStatus(val)}>
//                 <SelectTrigger className="w-[140px]">
//                   <SelectValue placeholder="Status" />
//                 </SelectTrigger>

//                 <SelectContent>
//                   <SelectItem value="ACTIVE">Active</SelectItem>
//                   <SelectItem value="DRAFT">Draft</SelectItem>
//                   <SelectItem value="DISCONTINUED">Discontinued</SelectItem>
//                 </SelectContent>
//               </Select>

//               {/* CATEGORY */}
//               <Select onValueChange={(val) => setCategoryId(val)}>
//                 <SelectTrigger className="w-[140px]">
//                   <SelectValue placeholder="Category" />
//                 </SelectTrigger>
//                 {categoriesData?.data?.data && (
//                   <SelectContent>
//                     {categoriesData?.data?.data.map((category: any) => (
//                       <SelectItem key={category.id} value={category.id}>
//                         {category.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 )}
//               </Select>

//               <Button variant="outline">
//                 <Filter size={16} /> Filter
//               </Button>
//             </div>
//           </div>

// <ProductTable columns={columns} data={products} isLoading={isLoading} />
//           {/* ================= TABLE =================


//          <Product>

//          <div className="overflow-x-auto rounded-2xl border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>
//                     <Checkbox
//                       checked={
//                         selected.length === products.length &&
//                         products.length > 0
//                       }
//                       onCheckedChange={toggleSelectAll}
//                     />
//                   </TableHead>

//                   <TableHead>Product</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Stock</TableHead>
//                   <TableHead>Price</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Action</TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {products.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={7} className="text-center">
//                       No products found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   products.map((item: any) => (
//                     <TableRow key={item.id}>

//                       {/* checkbox */}
//           {/* <TableCell>
//                         <Checkbox
//                           checked={selected.includes(item.id)}
//                           onCheckedChange={() => toggleSelect(item.id)}
//                         />
//                       </TableCell>

//                       {/* product */}
//           {/* <TableCell>
//                         <div className="flex items-center gap-3 min-w-[200px]">
//                           <div className="relative h-10 w-10 overflow-hidden rounded-lg">
//                             <Image
//                               src={item.image}
//                               alt={item.name}
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                           <span>{item.name}</span>
//                         </div>
//                       </TableCell>

//                       <TableCell>{item.category}</TableCell>

//                       <TableCell>
//                         <span
//                           className={
//                             item.stock.includes("Out")
//                               ? "text-red-500"
//                               : "text-green-600"
//                           }
//                         >
//                           {item.stock}
//                         </span>
//                       </TableCell>

//                       <TableCell>{item.price}</TableCell>

//                       <TableCell>
//                         <Badge>{item.status}</Badge>
//                       </TableCell>

//                       <TableCell>
//                         <Button variant="ghost" size="icon">
//                           <MoreHorizontal size={18} />
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table> */}


//           {/* ================= PAGINATION ================= */}
//           <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//             <p className="text-sm">
//               Showing {products.length} products
//             </p>

//             <Pagination>
//               <PaginationContent>
//                 <PaginationItem>
//                   <PaginationPrevious
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                   />
//                 </PaginationItem>

//                 <PaginationItem>
//                   <PaginationLink isActive>{page}</PaginationLink>
//                 </PaginationItem>

//                 <PaginationItem>
//                   <PaginationNext
//                     onClick={() => setPage((p) => p + 1)}
//                   />
//                 </PaginationItem>
//               </PaginationContent>
//             </Pagination>
//           </div>

//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ProductsPage;
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

import ProductTable from "./ProductTable";

import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { useAllCategoryQuery } from "@/redux/api/categorieApi";

import { CategoryRow } from "../../categories/page";
import { useDebounce } from "use-debounce";
import ATSModal from "@/components/shared/Modal/ATSModal";
import AddProduct from "../AddProduct";

// ======================
// TYPES
// ======================

export type ProductRow = {
  id: string;
  name: string;
  sku: string;
  image: string[];
  status: string;
  sellingPrice: number;
  category: CategoryRow[];
  createdAt: Date;
  isDeleted: boolean;
};

export type TableColumn<T> = {
  key: keyof T;
  label: string;
};


// ======================
// TABLE COLUMNS
// ======================

const columns: TableColumn<ProductRow>[] = [
  { key: "image", label: "Image" },
  { key: "name", label: "Name" },
  { key: "sku", label: "SKU" },
  { key: "sellingPrice", label: "Price" },
  { key: "category.name", label: "Category" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Created" },
  { key: "id", label: "Action" },
];


// ======================
// COMPONENT
// ======================

const ProductsPageContent = () => {

  // ======================
  // STATES
  // ======================

  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    string | undefined
  >(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  } = useGetAllProductsQuery({
    page,
    limit,
    searchTerm: debouncedSearch,
    status,
    categoryId,
  });

  const { data: categoriesData } =
    useAllCategoryQuery({});
  console.log(categoriesData)

  // ======================
  // DATA
  // ======================

  const products = data?.data || [];

  console.log(data,"products")
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

              <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => setIsModalOpen(true)}>
                <Plus size={16} />
                Add Product
              </Button>

            </div>

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

          <ProductTable
            columns={columns}
            data={products}
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
      <ATSModal open={isModalOpen} setOpen={setIsModalOpen} title="Add Product" description="Fill in the details to add a new product." >
        <AddProduct />
      </ATSModal>

    </div>
  );
};

export default ProductsPageContent;