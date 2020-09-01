import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { User } from './user.entity';

export const GetUser = createParamDecorator((data: unknown, executionContext: ExecutionContext): User => {
  return executionContext.getArgByIndex(1).req.user;
});
