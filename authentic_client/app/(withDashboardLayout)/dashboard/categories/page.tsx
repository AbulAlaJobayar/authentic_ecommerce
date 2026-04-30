"use client"
import ATSModal from '@/components/shared/Modal/ATSModal';
import ATSTable from '@/components/shared/Table/ATSTable';
import { Button } from '@/components/ui/button';
import { TATSDataProps, TATSHeadProps } from '@/types';
import { SquarePen } from 'lucide-react';
import { useState } from 'react';
import AddCategories from './AddCategories';
import { useAllCategoryQuery } from '@/redux/api/categorieApi';


export const head: TATSHeadProps<TATSDataProps>[] = [
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "action", label: "Action" },

];
const CategoriesPage = () => {
    const [open, setOpen] = useState(false)
    const { data, isLoading, isError } = useAllCategoryQuery('')
    console.log(data, "from category page")
    const categories = data?.data
    const handleOpen = () => {
        setOpen(true)
    }
    if (isLoading) {
        return <div>Loading...</div>
    }
    return (

        <div className=' mx-5 my-2'>
            <div className='justify-center flex mt-6 mb-3'>
                {/* left side */}
                <h1 className='text-2xl font-medium'>Categories</h1>
                {/* right side */}
                <Button onClick={handleOpen} className='ml-auto bg-[#6777EF]'>
                    <SquarePen />
                    Add Categories</Button>
            </div>
            <ATSTable head={head} data={categories} />
            <ATSModal open={open} setOpen={setOpen} title='Add Categories' >
                <AddCategories setOpen={setOpen} open={open} />
            </ATSModal>
        </div>
    );
};

export default CategoriesPage;