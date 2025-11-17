import hashPassword from '../helper/hashPassword';
// generate Otp and save DB
const generateOTP = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashOtp = (await hashPassword(otp.toString() as string)) as string;
  return {
    otp,
    hashOtp,
  };
};
export default generateOTP;
