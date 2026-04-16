import ATSTable from '@/components/shared/Table/ATSTable';
import { TATSDataProps, TATSHeadProps } from '@/types';
import React from 'react';

export const head: TATSHeadProps<TATSDataProps>[] = [
  { key: "image", label: "Image" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "address", label: "Address" },
  { key: "role", label: "Role" },
  { key: "accountStatus", label: "Account Status" },
  { key: "status", label: "Status" },
  { key: "description", label: "Description" },
  { key: "sealing", label: "Sealing" },
  { key: "category", label: "Category" },
  { key: "isDelete", label: "Is Delete" },
  { key: "review", label: "Review" }
];
const CategoriesPage = () => {


    return (
        <div>
           <ATSTable head={head} data={""}/>
        </div>
    );
};

export default CategoriesPage;