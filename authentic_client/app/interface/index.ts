export interface UserCreateData {
  name: string;
  email: string;
  mobile: string;
  image: File | string | null; // Adjust based on what 'image' actually is
  password: string;
}