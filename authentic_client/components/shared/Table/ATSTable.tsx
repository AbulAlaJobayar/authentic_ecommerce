"use client"
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TATSDataProps, TATSHeadProps } from '@/types';
import { SquarePen } from 'lucide-react';
import Image from 'next/image';
import { Trash2Icon, } from "@animateicons/react/lucide"
import { useDispatch } from 'react-redux';
import { setParams } from '@/redux/features/params/paramSlice';
const ATSTable = ({ head, data, }: { head: TATSHeadProps<TATSDataProps>[]; data: TATSDataProps[] }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader >
          <TableRow >
            {
              head?.map((h) => (
                <TableHead key={h.key} className="text-center align-middle">
                  {h.label}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row?.id}>
              {head.map((h) => (
                <TableCell className="text-center align-middle" key={String(h.key)}>
                  {(() => {
                    const value = row[h.key];

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

                    if (h.key === 'action') {
                      return <>
                        <div className='flex justify-center gap-10'>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              dispatch(setParams(row.id))
                            }
                          >
                            <SquarePen />
                          </Button>
                          <Button variant="destructive"  onClick={() =>
                              dispatch(setParams(row.id))
                            }><Trash2Icon size={24} /></Button>
                        </div >
                      </>

                    }

                    return <span className='justify-between'>{String(value ?? '')}</span>;
                  })()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div >
  );
};

export default ATSTable;