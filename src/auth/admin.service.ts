import { Injectable } from '@nestjs/common';

import { Params } from '../models/params.model';
import { UserResponseDto } from './dto/response/user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AdminService {

  public constructor(
    private readonly userRepository: UserRepository,
  ) {
  }

  public async approveCustomer(
    id: number,
    user: User,
  ): Promise<UserResponseDto> {
    return this.userRepository.approveCustomer(id, user);

  }
  public async getAllTripOrganizers(
    user: User,
    params: Params,
  ): Promise<UserResponseDto[]> {
    return this.userRepository.getAllTripOrganizers(user, params);
  }
}
