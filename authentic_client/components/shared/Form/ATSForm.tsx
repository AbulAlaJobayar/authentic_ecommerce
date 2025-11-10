"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

type TFormConfig<T extends FieldValues> = {
  resolver?: Resolver<T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  className?: string;
};

type TFormProps<T extends FieldValues> = {
  children: ReactNode;
  onSubmit: SubmitHandler<T>;
} & TFormConfig<T>;

const ATSFrom = <T extends FieldValues>({
  children,
  onSubmit,
  resolver,
  defaultValues,
  className,
}: TFormProps<T>) => {
  const formConfig: UseFormProps<T> = {};
  if (resolver) {
    formConfig.resolver = resolver;
  }
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  const methods = useForm<T>(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<T> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form className={cn(className)} onSubmit={handleSubmit(submit)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default ATSFrom;
