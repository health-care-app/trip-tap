import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from './user.entity';

export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext):User => {
  return ctx.getArgByIndex(1).req.user;
});