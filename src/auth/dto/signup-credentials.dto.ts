<<<<<<< HEAD
import { IsBoolean, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
=======
import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, IsBoolean } from 'class-validator';
>>>>>>> upstream/develop

export class SignUpCredentialsDto {

  @IsBoolean()
  public isTripOrganizer: boolean;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  public username: string;

  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public facebookId: string;

  @IsOptional()
  @IsString()
  public instagramId: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  public phoneNumber: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/,
    { message: 'Password too weak.' },
  )
  public password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  public firstName: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public lastName: string;

  @IsOptional()
  public dateOfBirth: Date;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(6)
  public gender: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public country: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  public city: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  public homeAddress: string;
}
