import { UserResponseDto } from './dto/response/user.dto';

export interface JwtPayload {
  profile: UserResponseDto;
}
