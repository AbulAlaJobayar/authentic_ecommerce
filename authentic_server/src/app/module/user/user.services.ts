import { User } from '../../../../generated/prisma';
import hashPassword from '../../helper/hashPassword';
import prisma from '../../shared/prisma';
import { generateCustomId } from './user.utils';

const createUserIntoDB = async (payload: User) => {
  const password = (await hashPassword(payload.password as string)) as string;

  const customId = (await generateCustomId(payload.role)) as string;
  payload.customId = customId;
  payload.password = password;

  const createUser = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      customId: true,
      email: true,
      mobile: true,
      image: true,
      role: true,
      verifiedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return createUser;
};

export const UserService = {
  createUserIntoDB,
};
