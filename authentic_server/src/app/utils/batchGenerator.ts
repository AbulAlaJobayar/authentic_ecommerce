import { now } from "moment";
//TODOS1. Generate batch number in the format of CATNAMYYYYMMDD exp(20260225) where CAT is the first three letters of the category, NAM is the first three letters of the name, and YYYYMMDD is the current date.
type TBatchProps={
    category:string;
    name:string;
    expire:Date;
}

export const batchNumberGenerator=(data:TBatchProps)=>{
const category=data.category.substring(0,3).toUpperCase()
const name= data.name.substring(0,3).toUpperCase()
const now = new Date();

const formatted = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;

console.log(formatted);
}