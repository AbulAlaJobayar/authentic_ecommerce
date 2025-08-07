import bcrypt from 'bcrypt'
 const hashPassword=async(pass:string)=>{
    return await bcrypt.hash(pass,10) 
}
export default hashPassword
