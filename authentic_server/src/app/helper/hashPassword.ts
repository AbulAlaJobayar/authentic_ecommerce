import bcrypt from 'bcrypt'
import config from '../config'
 const hashPassword=async(pass:string)=>{
    return await bcrypt.hash(pass,10) 
}
console.log("hash password",( hashPassword),config.saltRound)
export default hashPassword
