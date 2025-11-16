import { USER_ROLE } from './user.constant';

export type TUserRole = keyof typeof USER_ROLE;

export type TUserFilterRequest = {
  searchTerm?: string | undefined;
  customId?: string | undefined;
  email?: string | undefined;
  name?: string | undefined;
  mobile?: string | undefined;
  role?: string | undefined;
  verifiedAt?: boolean | undefined;
  otp?: string | undefined;
  isDeleted?: boolean | undefined;
  accountStatus?: string | undefined;
};
