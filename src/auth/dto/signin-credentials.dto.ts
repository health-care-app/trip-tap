import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class SignInCredentialsDto {

    public email: string;

    public phoneNumber: string;

    public username: string;

    public password: string;
}
