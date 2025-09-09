import { customAlphabet } from 'nanoid';

export const generateOrderNumber = (): string => {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // alphanumeric
  const generate = customAlphabet(alphabet, 12); // 12 characters
  return generate(); // e.g., "4F7G8H2J1K9L"
};
