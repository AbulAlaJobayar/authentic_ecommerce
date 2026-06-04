/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Controller, useFormContext } from "react-hook-form";
import React from "react";
import imageUploader from "@/helper/imageUploder";
import Image from "next/image";

type ATSInputProps = {
    size?: number | string;
    type?: string;
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    defaultValue?: string;
    id?: string;
    icon?: React.ReactNode;
    placeholder?: string;
    image?: string[];
    setImage: any;
};

const ATSImageInput = ({
    name,
    label,
    required,
    className,
    id,
    icon,
    image,
    setImage
}: ATSInputProps) => {
    const { control, setValue } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ fieldState: { error } }) => (
                <div className="space-y-1">
                    {label && (
                        <label
                            htmlFor={id || name}
                            className="block text-sm font-medium text-gray-700 dark:text-white mt-4"
                        >
                            <div className="flex gap-2">
                                <span className="flex items-center gap-2 dark:text-white">
                                    {icon} {label}
                                </span>
                                {required && <span className="text-red-500">*</span>}
                            </div>
                        </label>
                    )}

                    <motion.div whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 100 }}>
                        <Input

                            type="file"
                            required={required}
                            multiple
                            id={id || name}
                            name={name}
                            className={cn(className, error && "border-red-500 dark:text-white")}
                            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                const files = Array.from(e.target.files || []);
                                const urls = await Promise.all(
                                    files.map((file) => imageUploader(file))
                                );

                                setValue(name, urls);
                                
                                setImage([...(image || []), ...urls]);
                            }}
                        />
                    </motion.div>
                    {image && image.length > 0 && (
                        <div className="flex gap-4 mt-4">
                            {image.map((img, index) => (
                                <Image key={index} src={img} alt={`Uploaded ${index}`}  width={120}
  height={120} className="w-20 h-20 object-cover rounded" />
                            ))}
                        </div>
                    )}

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[#E74C3C] text-sm mt-1"
                        >
                            {error.message}
                        </motion.p>
                    )}
                </div>
            )}
        />
    );
};

export default ATSImageInput;
