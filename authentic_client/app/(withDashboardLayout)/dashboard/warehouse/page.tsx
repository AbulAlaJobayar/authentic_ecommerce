"use client"
import ATSModal from '@/components/shared/Modal/ATSModal';
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import { useAllCategoryQuery } from '@/redux/api/categorieApi';
import { useSelector } from 'react-redux';
import AddWarehouse from './AddWarehouse';
import WarehouseTable from './WarehouseTable';

export type ProductRow = {
    id: string;
    name: string;
    address:string;
    action: string;
};
export type TableColumn<T> = {
    key: keyof T;
    label: string;
};
const columns: TableColumn<ProductRow>[] = [
    { key: "name", label: "Name" },
    { key: "address", label: "Address" },
    { key: "action", label: "Action" },

];
const WarehousePage = () => {
    const [open, setOpen] = useState(false)

    const { data, isLoading, isError } = useAllCategoryQuery('')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const id = useSelector((state: any) => state.paramsInfo.id)
    console.log(id, "from category page")
    const categories = data?.data
    const handleOpen = () => {
        setOpen(true)
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div className='justify-center items-center mx-auto max-w-full text-center font-bold text-red-500'>Error loading categories.</div>
    }


    return (

        <div className=' mx-5 my-2'>
            <div className='justify-center flex mt-6 mb-3'>
                {/* left side */}
                <h1 className='text-2xl font-medium'>Warehouse</h1>
                {/* right side */}
                <Button onClick={handleOpen} className='ml-auto bg-[#6777EF]'>
                    <SquarePen />
                    Add Warehouse</Button>
            </div>
            <WarehouseTable columns={columns} data={categories} />
            <ATSModal open={open} setOpen={setOpen} title='Add Warehouse' >
                <AddWarehouse setOpen={setOpen} open={open} />
            </ATSModal>

        </div>
    );
};

export default WarehousePage;