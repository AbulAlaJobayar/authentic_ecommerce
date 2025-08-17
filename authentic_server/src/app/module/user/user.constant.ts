export const USER_ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MANAGER: 'MANAGER',
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
} as const;
export const UserStatus = ['IN_PROGRESS', 'ACTIVE', 'BLOCK', 'SUSPEND'];
export const userSearchableFields: string[] = [
  'customId',
  'email',
  'name',
  'mobile',
];
export const userFiltarableableFields: string[] = [
  'searchTerm',
  'customId',
  'email',
  'name',
  'mobile',
  'accountStatus',
  "role",
  "verifiedAt",
  "isDeleted"
];
