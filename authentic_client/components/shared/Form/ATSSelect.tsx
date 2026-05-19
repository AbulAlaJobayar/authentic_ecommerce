"use client";

import * as React from "react";

import {
    Controller,
    useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";

import {
    motion,
} from "motion/react";

import {
    ChevronDown,
} from "lucide-react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ======================================================
// TYPES
// ======================================================

type TSelectOption = {
    label: string;
    value: string;
};

type ATSSelectProps = {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    id?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
    options: TSelectOption[];
};

// ======================================================
// COMPONENT
// ======================================================

const ATSSelect = ({
    name,
    label,
    required,
    className,
    defaultValue,
    placeholder = "Select option",
    id,
    icon,
    disabled,
    options,
}: ATSSelectProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <div>


                    {/* SELECT */}

                    <motion.div
                        whileTap={{
                            scale: 0.98,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                        }}
                    >
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={disabled}
                        >
                            <SelectTrigger
                                className={cn(
                                    `
                    h-11 w-full rounded-xl border
                    border-gray-200 bg-white
                    px-3 text-sm shadow-sm
                    transition-all duration-300
                    
                    hover:border-[#6777EF]/50
                    
                    focus:border-[#6777EF]
                    focus:ring-2
                    focus:ring-[#6777EF]/20
                    
                    dark:border-gray-700
                    dark:bg-[#111827]
                    dark:text-white
                  `,
                                    error &&
                                    `
                      border-red-500
                      focus:ring-red-200
                    `,
                                    className
                                )}
                                id={id || name}
                                aria-label={label || name}
                            >
                                <SelectValue
                                    placeholder={placeholder}
                                />
                            </SelectTrigger>

                            <SelectContent
                            >
                                {options.map((option) => (
                                    <SelectItem
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </motion.div>

                    {/* ERROR */}

                    {error && (
                        <motion.p
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="
                mt-1 text-sm
                text-[#E74C3C]
              "
                        >
                            {error.message}
                        </motion.p>
                    )}
                </div>
            )}
        />
    );
};

export default ATSSelect;