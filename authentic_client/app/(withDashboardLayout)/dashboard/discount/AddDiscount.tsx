/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"
import React from "react";
import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSInput from "@/components/shared/Form/ATSInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import {
    useCreateDiscountMutation,
} from "@/redux/api/discountApi";

import { useGetAllProductsQuery } from "@/redux/api/productApi";
import ATSImageInput from "@/components/shared/Form/ATSImageInput";

// ---------------------- SCHEMA ----------------------

const FormSchema = z.object({
    name: z.string().min(1),
    image: z.array(z.string()).default([]),
    code: z.string().optional(),
    percentage: z.string(),
    productIds: z.array(z.string()).default([]),
    active: z.boolean().default(true),
    startDate: z.string(),
    endDate: z.string(),
});

// type TFormValues = z.infer<typeof FormSchema>;


export default function AddDiscount({ setOpen }: any) {
    const { data } = useGetAllProductsQuery({});
    const products = data?.data || [];

    const [ids, setIds] = React.useState<string[]>([]);
    const [image, setImage] = React.useState<string[]>([]);

    const [createDiscount, { isLoading }] = useCreateDiscountMutation();

    const handleSubmit = async (values: any) => {
        const payload = {
            ...values,
            percentage: Number(values.percentage),
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate),
            productIds: ids,
        };

        console.log(payload, "payload")
        const res = await createDiscount(payload);

        if (res?.data?.success) {
            toast.success("Discount created successfully");
            setOpen(false);
        } else {
            toast.error("Failed to create discount");
        }
    };

    return (
        <ATSFrom
            resolver={zodResolver(FormSchema)}
            defaultValues={{
                name: "",
                image: [],
                code: "",
                percentage: 0,
                active: true,
                startDate: "",
                endDate: "",
            }}
            onSubmit={handleSubmit}
        >
            <div className="space-y-6">

                {/* PRODUCT SELECTOR */}
                <Card>
                    <CardHeader>Select Products</CardHeader>
                    <CardContent>
                        <ProductSelector
                            products={products}
                            ids={ids}
                            setIds={setIds}
                        />
                    </CardContent>
                </Card>

                {/* FORM */}
                <Card>
                    <CardHeader>Discount Info</CardHeader>
                    <CardContent className="space-y-4">
                        <ATSInput name="name" label="Discount Name" />
                        <ATSInput name="code" label="Coupon Code" />
                        <ATSImageInput name="image" setImage={setImage} image={image} />
                        <ATSInput name="percentage" type="number" label="Percentage %" />
                        <ATSInput name="startDate" type="date" label="Start Date" />
                        <ATSInput name="endDate" type="date" label="End Date" />
                    </CardContent>
                </Card>

                <Button type="submit" className="w-full">
                    {isLoading ? "Creating..." : "Create Discount"}
                </Button>

            </div>
        </ATSFrom>
    );
}

function ProductSelector({ products, ids, setIds }: any) {
    const [search, setSearch] = React.useState("");

    const toggleProduct = (id: string) => {
        setIds((prev: string[]) => {
            if (prev.includes(id)) {
                return prev.filter((i) => i !== id);
            }
            return [...prev, id];
        });
    };

    const filtered = React.useMemo(() => {
        return (products || []).filter((p: any) =>
            p?.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);

    return (
        <div className="space-y-3">

            {/* SEARCH */}
            <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filtered.map((p: any) => {
                    const isSelected = ids.includes(p.id);

                    return (
                        <div
                            key={p.id}
                            onClick={() => toggleProduct(p.id)}
                            className={`border rounded-lg p-2 cursor-pointer transition ${isSelected ? "border-blue-500 ring-2 ring-blue-200" : ""
                                }`}
                        >
                            {/* NAME */}
                            <p className="text-sm font-medium">{p.name}</p>

                            {/* PRICE */}
                            <p className="text-xs text-gray-500">
                                ৳ {p.sellingPrice}
                            </p>

                            {/* CHECKBOX */}
                            <div className="mt-2 flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    readOnly
                                />
                                <span className="text-xs">
                                    {isSelected ? "Selected" : "Select"}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}