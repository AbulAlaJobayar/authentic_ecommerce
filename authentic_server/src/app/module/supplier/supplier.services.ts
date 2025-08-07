/* eslint-disable @typescript-eslint/no-explicit-any */
import  httpStatus  from 'http-status';
import { Supplier } from '../../../../generated/prisma';
import { AppError } from '../../error/AppError';
import prisma from '../../shared/prisma';

// TODO: define Type for payload
const createSupplierIntoDB = async (payload: any) => {
  const result = await prisma.supplier.create({
    data: payload,
  });
  return result;
};

// TODO add pagination
const getAllSupplierFromDB = async () => {
  const result = await prisma.supplier.findMany({
    where:{ isDeleted :false}
  });
  return result;
};
const updateSupplierFromDB = async (id: string, payload: Partial<Supplier>) => {
  
  const isSupplierExist=await prisma.supplier.findFirst({
    where:{id}
  })
  if(!isSupplierExist){
    throw new AppError(httpStatus.NOT_FOUND,"Supplier Not Found")
  }
  if(isSupplierExist?.isDeleted){
    throw new AppError(httpStatus.NOT_FOUND,"Supplier is deleted")
  }

    const result = await prisma.supplier.update({
    where: { id: id },
    data: payload,
  });
  return result;
};

const deleteSupplierFromDB=async(id:string)=>{
 
 const isSupplierExist=await prisma.supplier.findFirst({
    where:{id}
  })
  if(!isSupplierExist){
    throw new AppError(httpStatus.NOT_FOUND,"Supplier Not Found")
  }
  if(isSupplierExist?.isDeleted){
    throw new AppError(httpStatus.NOT_FOUND,"Supplier is Already deleted")
  }
   await prisma.supplier.update({
       where:{id},
       data:{isDeleted :true}
    })
    return null
}

export const SupplierServices = {
  createSupplierIntoDB,
  getAllSupplierFromDB,
  updateSupplierFromDB,
  deleteSupplierFromDB
};
