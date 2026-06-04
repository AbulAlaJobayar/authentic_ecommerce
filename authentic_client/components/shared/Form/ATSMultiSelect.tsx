/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller, useFormContext } from "react-hook-form";

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import { useState } from "react";



type ATSInputProps = {
  size?: number | string;
  type?: string;
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  options:any[]
};

const ATSMultiSelect = ({
  // type = "text",
  name,
  label,
  required,
  className,
  defaultValue,
  placeholder,
  icon,
  options

}:ATSInputProps) => {
  const anchor = useComboboxAnchor();
  const [value, setValue] = useState<string[]>([])
console.log(options,"options in multi select")
  // const values = items?.map((item:any) => item.id);
  const { control } = useFormContext();
  return (
   <Controller
  name={name}
  control={control}
  defaultValue={[]}
  render={({ field }) =>{
    console.log(field.value, "field value in multi select")
    return (
    <Combobox
      multiple
      items={options?.map((item) => item.name)}
      value={value}
      onValueChange={setValue}
    >
      <ComboboxChips
        ref={anchor}
        className="w-full min-h-10 border rounded-md px-2"
      >
         <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
          <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>

      <ComboboxContent anchor={anchor}>
        <ComboboxEmpty>
          No items found.
        </ComboboxEmpty>

         <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )}}
/>
  );
}
export default ATSMultiSelect;