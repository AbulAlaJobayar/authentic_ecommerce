import { Controller, useFormContext } from "react-hook-form";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import "react-phone-number-input/style.css";
import PhoneInputWithCountrySelect from "react-phone-number-input";

type ATSPhoneInputProps = {
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    placeholder?: string;
};

const ATSPhoneInput = ({
    name,
    label,
    required,
    className,
    placeholder,
}: ATSPhoneInputProps) => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
                <div className="space-y-1">
                    {label && (
                        <label className="block text-sm font-medium text-gray-700 dark:text-white mt-4">
                            {label}
                            {required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                    )}

                    <motion.div
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <PhoneInputWithCountrySelect
                            international
                            defaultCountry="BD"
                            value={value}
                            onChange={onChange}
                            placeholder={placeholder || "Enter phone number"}
                            className={cn(className,
                                "border p-2 rounded w-full bg-transparent dark:text-white",
                                error && "border-red-500"
                            )}
                        />
                    </motion.div>

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

export default ATSPhoneInput;