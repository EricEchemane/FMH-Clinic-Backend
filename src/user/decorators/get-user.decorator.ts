import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../entities';

export type RequestUser = {
  userId: string;
  email: string;
  role: UserRole;
};

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
