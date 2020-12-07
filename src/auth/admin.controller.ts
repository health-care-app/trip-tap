import { Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GetUser } from '@Auth/get-user.decorator';
import { User } from '@Auth/user.entity';

import { Params } from '../models/params.model';
import { AdminService } from './admin.service';
import { UserResponseDto } from './dto/response/user.dto';

@Controller('admin')
@UseGuards(AuthGuard())
export class AdminController {

  public constructor(
    private readonly adminService: AdminService,
  ) {
  }

  @Post('approve/:id')
  public async approveCustomer(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<UserResponseDto> {
    return this.adminService.approveCustomer(id, user);
  }

  @Get('trip-organizers')
  // tslint:disable-next-line: prefer-function-over-method
  public async getAllTripOrganizers(
    @GetUser() user: User,
    @Query() params: Params,
  ): Promise<UserResponseDto[]> {
    return this.adminService.getAllTripOrganizers(user, params);
  }
}
