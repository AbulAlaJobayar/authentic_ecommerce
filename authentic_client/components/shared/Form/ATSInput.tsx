
import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {motion} from "motion/react"

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
  placeholder?:string;
};

const ATSInput = ({
  type = "text",
  name,
  label,
  required,
  className,
  defaultValue,
  placeholder,
  id,
  icon,
}: ATSInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1">
          {label && (
            <label
              htmlFor={id || name}
              className="block text-sm font-medium text-gray-700 dark:text-white mt-4"
            >
              <div className="flex gap-2">
                <span className=" flex items-center gap-2 dark:text-white">
                  {icon} {label}
                </span>
                {required && <span className="text-red-500 "> *</span>}
              </div>
            </label>
          )}
          <motion.div 
            whileTap={{ scale: 0.98,}}
            transition={{ type: "spring", stiffness: 100 }}
          >
          
          <Input
            {...field}
            type={type}
            required={required}
            name={name}
            placeholder={placeholder}
            className={cn(className, error && "border-red-500 dark:text-white")}
            id={id || name}
            aria-label={label || name}
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

export default ATSInput;