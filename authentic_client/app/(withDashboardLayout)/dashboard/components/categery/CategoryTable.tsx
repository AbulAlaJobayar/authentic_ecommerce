"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ProductRow, TableColumn } from '../../categories/page';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';
import { Trash2Icon } from '@animateicons/react/lucide';
import ATSModal from '@/components/shared/Modal/ATSModal';
import { useState } from 'react';
import EditCategories from '../../categories/EditCategories';
import DeleteCategory from '../../categories/DeleteCategory';

type CategoryTableProps = {
    columns: TableColumn<ProductRow>[];
    data: ProductRow[];
};

const CategoryTable = (data: CategoryTableProps) => {
    const [open, setOpen] = useState(false);
    const [editedId,setEditedId]=useState("")
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [deletedId, setDeletedId] = useState("")

 
    const handleEdit = async(id: string) => {
        setOpen(true)
        setEditedId(id)
    }
    const handleDelete = async(id: string) => {
        setIsDeleteOpen(true)
        setDeletedId(id)
        console.log(id)
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        {
                            data?.columns?.map((h) => (
                                <TableHead key={h.key}>
                                    {h.label}</TableHead>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data?.map((invoice) => (
                        <TableRow key={invoice.id}>
                            {data?.columns?.map((col) => (
                                <TableCell key={col.key}>

                                    {(() => {
                                        const value = invoice[col.key];

                                        // Check if value is an image URL
                                        const isImageUrl = (val: unknown): boolean => {
                                            if (typeof val !== 'string') return false;
                                            return (
                                                val.startsWith('http') ||
                                                val.startsWith('/') ||
                                                /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(val)
                                            );
                                        };

                                        if (isImageUrl(value)) {
                                            return (
                                                <Image
                                                    src={String(value)}
                                                    alt="table cell image"
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full object-cover"
                                                />
                                            );
                                        }

                                        if (col.key === 'action') {
                                            return <>
                                                <div className='flex justify-center gap-10'>

                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => handleEdit(invoice.id)}
                                                
                                                    >
                                                        <SquarePen />
                                                    </Button>
                                                    <Button variant="destructive" onClick={() => handleDelete(invoice.id)}>
                                                        <Trash2Icon size={24} />
                                                    </Button>
                                                </div >
                                            </>

                                        }

                                        return <span >{String(value ?? '')}</span>;
                                    })()}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ATSModal open={open} setOpen={setOpen} title='Edit Categories'

            >
                <EditCategories setOpen={setOpen} id={editedId} />
            </ATSModal>
               <DeleteCategory id={deletedId} open={isDeleteOpen} setOpen={setIsDeleteOpen} />
        </div>
    );
};

export default CategoryTable;