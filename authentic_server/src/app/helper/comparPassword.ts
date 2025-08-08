import bcrypt from 'bcrypt';
const comparPassword = async (newPassword: string, hashPassword: string) => {
  const result = await bcrypt.compare(newPassword, hashPassword);
  return result;
};
export default comparPassword;
