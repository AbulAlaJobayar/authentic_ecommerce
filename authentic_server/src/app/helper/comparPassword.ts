import bcrypt from 'bcrypt';
const comparPassword = async (newPassword: string, hashPassword: string) => {
  return await bcrypt.compare(newPassword, hashPassword);
};
export default comparPassword;
