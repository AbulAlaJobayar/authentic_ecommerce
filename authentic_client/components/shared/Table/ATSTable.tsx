"use client"
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TATSDataProps, TATSHeadProps } from '@/types';
import Image from 'next/image';

const ATSTable = ({ head, data }: { head: TATSHeadProps<TATSDataProps>[]; data: TATSDataProps[] }) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>

            {
              head?.map((h) => (
                <TableHead key={h.key}>{h.label}</TableHead>
              ))
            }
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row?.id}>
              {head.map((h) => (
                <TableCell key={String(h.key)}>
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
                        <div className='flex justify-end'>

                          <Button >Update</Button>
                          <Button variant="destructive" className='ml-2'>Delete</Button>
                        </div>
                      </>

                    }

                    return <span>{String(value ?? '')}</span>;
                  })()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ATSTable;