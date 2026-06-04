/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSImageInput from "@/components/shared/Form/ATSImageInput";
import ATSInput from "@/components/shared/Form/ATSInput";
import ATSSelect from "@/components/shared/Form/ATSSelect";
import { Button } from "@/components/ui/button";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { useAllCategoryQuery } from "@/redux/api/categorieApi";
import { useCreateProductsMutation } from "@/redux/api/productApi";
import { useGetAllSuppliersQuery } from "@/redux/api/suppliers";
import { useAllWarehouseQuery } from "@/redux/api/warehouse";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import z from "zod";

// ================= VALIDATION =================

const productSchemaValidation = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Product Name is Required"),

    sku: z
        .string()
        .trim()
        .regex(
            /^[A-Z0-9-]+$/,
            "SKU must contain only uppercase letters, numbers, and hyphens"
        ),

    description: z
        .string()
        .trim()
        .min(1, "Description is Required"),

    categoryId: z
        .string()
        .trim()
        .min(1, "Category is Required"),

    image: z.array(z.string()).min(1)
});

const inventorySchemaValidation = z.object({
    alertQuantity: z.coerce
        .number()
        .min(1, "Alert Quantity required"),
});

const productBatchSchemaValidation = z.object({
    batchNumber: z
        .string()
        .trim()
        .regex(
            /^LOT\d{6}$/,
            "Format: LOT######"
        ),

    expiryDate: z.string(),

    quantity: z.coerce
        .number()
        .min(1, "Quantity required"),

    buyingPrice: z.coerce
        .number()
        .min(1, "Buying price required"),

    costPrice: z.coerce
        .number()
        .min(1, "Cost price required"),

    sellingPrice: z.coerce
        .number()
        .min(1, "Selling price required"),

    shelfCode: z
        .string()
        .regex(
            /^S-\d{2}[A-Z]$/,
            "Format: S-01A"
        ),

    rackCode: z
        .string()
        .regex(/^R-\d{2}$/, "Format: R-01"),

    supplierId: z.string().min(1, "Supplier required"),

    warehouseId: z.string().min(1, "Warehouse required"),
});

const FormSchema = z.object({
    product: productSchemaValidation,
    inventory: inventorySchemaValidation,
    productBatch: productBatchSchemaValidation,
});

type TFormValues = z.input<typeof FormSchema>;

// ================= DEFAULT VALUES =================

const defaultValues: TFormValues = {
    product: {
        name: "",
        sku: "",
        description: "",
        categoryId: "",
        image: ""
    },

    inventory: {
        alertQuantity: 0,
    },

    productBatch: {
        batchNumber: "",
        expiryDate: "",
        quantity: 0,
        buyingPrice: 0,
        costPrice: 0,
        sellingPrice: 0,
        shelfCode: "",
        rackCode: "",
        supplierId: "",
        warehouseId: "",
    },
};

// ================= SECTION TITLE =================

const SectionTitle = ({
    title,
    subtitle,
}: {
    title: string;
    subtitle?: string;
}) => {
    return (
        <div className="space-y-1 border-b pb-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                {title}
            </h2>

            {subtitle && (
                <p className="text-sm text-muted-foreground">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

// ================= COMPONENT =================

const AddProduct = () => {
    const [image, setImage] = useState<string[]>([])

    const { data: categoriesData } =
        useAllCategoryQuery({});
    const { data: warehousesData } = useAllWarehouseQuery({});
    const { data: suppliersData } = useGetAllSuppliersQuery({});
    const [createProduct] = useCreateProductsMutation()

    // ================= submit form===============
    const handleSubmit = async (data: TFormValues) => {


        try {

            console.log(data.product.image, image, "my image")
            const res = await createProduct(data);

            console.log(res, "res");
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="min-h-screen bg-gray-50 ">

            <div className="">
                <ATSFrom
                    resolver={zodResolver(FormSchema)}
                    onSubmit={handleSubmit}
                    defaultValues={defaultValues}
                    className="p-5 md:p-8 lg:p-10"
                >
                    <FieldGroup className="space-y-10">

                        {/* ===================================================== */}
                        {/* PRODUCT INFORMATION */}
                        {/* ===================================================== */}

                        <section className="space-y-6">
                            <SectionTitle
                                title="Product Information"
                                subtitle="Basic information about the product"
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="name">
                                        Product Name
                                    </FieldLabel>

                                    <ATSInput
                                        name="product.name"
                                        id="name"
                                        type="text"
                                        placeholder="Examination Gloves"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="sku">
                                        SKU
                                    </FieldLabel>

                                    <ATSInput
                                        name="product.sku"
                                        id="sku"
                                        type="text"
                                        placeholder="SAT-LAT-PWD-M-100"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2 xl:col-span-2">
                                    <FieldLabel htmlFor="description">
                                        Description
                                    </FieldLabel>

                                    <ATSInput
                                        name="product.description"
                                        id="description"
                                        type="text"
                                        placeholder="Short product description"
                                        required
                                    />
                                </Field>
                                <Field className="space-y-2 xl:col-span-2">
                                    <FieldLabel htmlFor="image">
                                        Image
                                    </FieldLabel>

                                    <ATSImageInput
                                        name="product.image"
                                        id="image"
                                        required
                                        image={image}
                                        setImage={setImage}
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="categoryId">
                                        Category ID
                                    </FieldLabel>

                                    {/* CATEGORY */}


                                    <ATSSelect
                                        name="product.categoryId"
                                        label="Category"
                                        placeholder="Select category"
                                        options={categoriesData?.data?.data.map((cat: any) => ({
                                            label: cat.name,
                                            value: cat.id,
                                        })) || []}
                                        required
                                    />


                                </Field>
                            </div>
                        </section>

                        {/* ===================================================== */}
                        {/* INVENTORY */}
                        {/* ===================================================== */}

                        <section className="space-y-6">
                            <SectionTitle
                                title="Inventory Settings"
                                subtitle="Inventory alert configuration"
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="alertQuantity">
                                        Alert Quantity
                                    </FieldLabel>

                                    <ATSInput
                                        name="inventory.alertQuantity"
                                        id="alertQuantity"
                                        type="number"
                                        placeholder="10"
                                        required
                                    />
                                </Field>
                            </div>
                        </section>

                        {/* ===================================================== */}
                        {/* PRODUCT BATCH */}
                        {/* ===================================================== */}

                        <section className="space-y-6">
                            <SectionTitle
                                title="Batch & Pricing"
                                subtitle="Batch tracking, stock quantity and pricing"
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="batchNumber">
                                        Batch Number
                                    </FieldLabel>

                                    <ATSInput
                                        name="productBatch.batchNumber"
                                        id="batchNumber"
                                        type="text"
                                        placeholder="LOT240518A"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="expiryDate">
                                        Expiry Date
                                    </FieldLabel>

                                    <ATSInput
                                        name="productBatch.expiryDate"
                                        id="expiryDate"
                                        type="date"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="quantity">
                                        Quantity
                                    </FieldLabel>

                                    <ATSInput
                                        name="productBatch.quantity"
                                        id="quantity"
                                        type="number"
                                        placeholder="0"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="buyingPrice">
                                        Buying Price
                                    </FieldLabel>

                                    <ATSInput
                                        name="productBatch.buyingPrice"
                                        id="buyingPrice"
                                        type="number"
                                        placeholder="0.00"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="costPrice">
                                        Cost Price
                                    </FieldLabel>

                                    <ATSInput
                                        name="productBatch.costPrice"
                                        id="costPrice"
                                        type="number"
                                        placeholder="0.00"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="sellingPrice">
                                        Selling Price
                                    </FieldLabel>

                                    <ATSInput
                                        name="productBatch.sellingPrice"
                                        id="sellingPrice"
                                        type="number"
                                        placeholder="0.00"
                                        required
                                    />
                                </Field>
                            </div>
                        </section>

                        {/* ===================================================== */}
                        {/* STORAGE INFORMATION */}
                        {/* ===================================================== */}

                        <section className="space-y-6">
                            <SectionTitle
                                title="Storage & Supplier"
                                subtitle="Warehouse, rack and supplier information"
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="shelfCode">
                                        Shelf Code
                                    </FieldLabel>

                                    <ATSInput
                                        name="productBatch.shelfCode"
                                        id="shelfCode"
                                        type="text"
                                        placeholder="S-01A"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="rackCode">
                                        Rack Code
                                    </FieldLabel>

                                    <ATSInput
                                        name="productBatch.rackCode"
                                        id="rackCode"
                                        type="text"
                                        placeholder="R-01"
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="supplierId">
                                        Supplier
                                    </FieldLabel>
                                    <ATSSelect
                                        name="productBatch.supplierId"
                                        label="Supplier"
                                        placeholder="Select supplier"
                                        options={suppliersData?.data?.data.map((cat: any) => ({
                                            label: cat.name,
                                            value: cat.id,
                                        })) || []}
                                        required
                                    />
                                </Field>

                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="warehouseId">
                                        Warehouse
                                    </FieldLabel>

                                    <ATSSelect
                                        name="productBatch.warehouseId"
                                        label="Warehouse"
                                        placeholder="Select warehouse"
                                        options={warehousesData?.data?.data.map((cat: any) => ({
                                            label: cat.name,
                                            value: cat.id,
                                        })) || []}
                                        required
                                    />
                                </Field>
                            </div>
                        </section>

                        {/* ===================================================== */}
                        {/* ACTION BUTTONS */}
                        {/* ===================================================== */}

                        <div>
                            <Button
                                type="submit"
                            >
                                Create Product
                            </Button>
                        </div>

                    </FieldGroup>
                </ATSFrom>
            </div>
        </div>
    );
};

export default AddProduct;