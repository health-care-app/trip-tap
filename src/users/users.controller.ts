import { Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    public constructor(
        private readonly UsersService: UsersService,
    ) {
    }

    @Get()
    public getAllUsers(): void {
        console.log('Get All Users');
    }

    @Post()
    public createUser(): void {

        console.log('Create User');
    }
}
