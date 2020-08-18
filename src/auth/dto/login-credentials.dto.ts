import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class LoginCredentialsDTO {

    public email: string;

    public phonenumber: string;

    public username: string;

    public password: string;
}