"use client";
import ATSFrom from "@/components/shared/Form/ATSForm";
import ATSImageInput from "@/components/shared/Form/ATSImageInput";
import ATSInput from "@/components/shared/Form/ATSInput";
import { Button } from "@/components/ui/button";
import DotWave from "@/components/ui/dot-wave";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useCreateCategoryMutation } from "@/redux/api/categorieApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";

import z from "zod";

const FormSchema = z.object({
  name: z
    .string()
    .regex(
  /^[A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)*$/,
  "Each word must start with a capital letter"
),
  image: z.any(),
});
type TFormValues = z.infer<typeof FormSchema>;
const defaultValue = {
  name: "",
  image: "",
};
type TProps = {
  open?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddCategories = ({ setOpen }: TProps) => {
  const [image, setImage] = useState<string[]>([]);

  const [createCategory, { isLoading, isError }] = useCreateCategoryMutation();
  const handleSubmit = async (values: TFormValues) => {
    try {
      const res = await createCategory({ ...values, image: image[0] });
      console.log(res, "response from create category");
      if (res && res?.data?.success) {
        toast.success(res?.data?.message || "Category created successfully", {
          description: res?.data?.message,
        });
        setOpen(false);
      } else {
        toast.error(
          (res?.error as { data: string })?.data || "Failed to create category",
        );
        setOpen(false);
      }
    } catch (error) {
      console.log(error, "from error");
      if (isError) {
        toast.error("Failed to create category");
        setOpen(false);
      } else if (error instanceof Error) {
        toast.error(error.message);
        setOpen(false);
      }
    }
  };
  return (
    <div>
      <ATSFrom
        resolver={zodResolver(FormSchema)}
        onSubmit={handleSubmit}
        defaultValues={defaultValue}
        className="p-6 md:p-8"
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <ATSInput name="name" id="name" type="text" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="image">Image</FieldLabel>
            <ATSImageInput
              setImage={setImage}
              image={image}
              name="image"
              id="image"
              required
            />
          </Field>

          <Field>
            <Button className="bg-[#6777EF] hover:bg-[#4C60DA]" type="submit">
              {isLoading ? (
                <span>
                  Adding <DotWave />
                </span>
              ) : (
                "Add Category"
              )}
            </Button>
          </Field>
        </FieldGroup>
      </ATSFrom>
    </div>
  );
};

export default AddCategories;
