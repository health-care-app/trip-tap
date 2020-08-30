import { Injectable } from '@nestjs/common';

import { Approved } from '../models/approved.model';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AdminService {

    public constructor(private readonly userRepository: UserRepository) {

    }

    public async approveCustomer(
        id: number,
        user: User,
    ): Promise<User> {
        const approvedUser: User = await this.userRepository.approveCustomer(id, user);

        return approvedUser;
    }
    public static async getAllTripOrganizers(
        user: User,
        approved: Approved,
    ): Promise<User[]> {

        return UserRepository.getAllTripOrganizers(user, approved);
    }
}
