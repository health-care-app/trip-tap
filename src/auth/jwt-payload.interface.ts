import { User } from "./user.entity";

export interface JwtPayload {
  profile: User;
}
