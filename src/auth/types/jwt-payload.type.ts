import { UserRole } from 'src/user/entities';

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};
