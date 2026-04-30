"use client"

import ATSModal from '@/components/shared/Modal/ATSModal';
import ATSTable from '@/components/shared/Table/ATSTable';
import { Button } from '@/components/ui/button';
import { TATSDataProps, TATSHeadProps } from '@/types';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import Product from './Product';
const columns: TATSHeadProps<TATSDataProps>[] = [
    { key: "name", label: "Name" },
    { key: "description", label: "Description" },
    { key: "price", label: "Price" },
    { key: "category", label: "Category" },
]


const AddProductPage = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <div className='mx-4'>
            <div className='justify-center flex mt-6 mb-3'>
                {/* left side */}
                <h1 className='text-2xl font-medium'>Products</h1>
                {/* right side */}
                <Button onClick={handleOpen} className='ml-auto bg-[#6777EF]'>
                    <SquarePen />
                    Add Product</Button>
            </div>
            <ATSTable head={columns} data={[]} />
            <ATSModal open={open} setOpen={setOpen} onCancel={() => setOpen(false)} title='Add Product' >

                <Product />
            </ATSModal>




        </div>
    );
};

export default AddProductPage;