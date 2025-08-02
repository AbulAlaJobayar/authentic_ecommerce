import bcrypt from 'bcrypt'
import config from '../config'
 const hashPassword=async(pass:string)=>{
    return await bcrypt.hash(pass,10) 
}
export default hashPassword
