import { Role } from '../../../../generated/prisma';
import prisma from '../../shared/prisma';

// Define prefix mapping for each role
const ROLE_PREFIXES: Record<Role, string> = {
  [Role.CUSTOMER]: 'AC',
  [Role.SUPER_ADMIN]: 'SU',
  [Role.STAFF]: 'ST',
  [Role.MANAGER]: 'MA',
  // Add other roles if needed
};

export const generateCustomId = async (role: Role): Promise<string> => {
  // Get the last user with the specified role
  const lastUser = await prisma.user.findFirst({
    where: { role },
    orderBy: { createdAt: 'desc' },
    select: { customId: true },
  });

  // Determine the next ID number
  let nextNumber = 1; // Default to 1 if no users exist
  
  if (lastUser?.customId) {
    // Extract the numeric part (assuming format "XX-0000")
    const numberPart = lastUser.customId.split('-')[1];
    if (numberPart) {
      const lastNumber = parseInt(numberPart, 10);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }
  }

  // Format the new ID with leading zeros
  const prefix = ROLE_PREFIXES[role];
  return `${prefix}-${nextNumber.toString().padStart(4, '0')}`;
};