import { Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@Auth/get-user.decorator';
import { User } from '@Auth/user.entity';

import { TripsService } from './trips.service';

@Controller('admin/approve')
@UseGuards(AuthGuard())
export class AdminController {

    public constructor(
        private readonly tripsService: TripsService,
    ) { }

    @Post('/:id')
    public async approveCustomer(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<User> {

        const approvedUser: User = await this.tripsService.approveCustomer(id, user);

        return approvedUser;
    }

}
