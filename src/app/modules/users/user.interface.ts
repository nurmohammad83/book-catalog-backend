import { Role } from '@prisma/client';

export type UserData = {
  id: string;
  name: string;
  email: string;
  role: Role;
  contactNo: string;
  address: string;
  profileImg: string;
};
