import { User } from '../../user.entity';

export class UserResponseDto {
  public id: number;
  public userType: string;
  public username: string;
  public email: string;
  public approved: boolean;
  public phoneNumber: string;
  public password: string;
  public facebookId: string;
  public instagramId: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public gender: string;
  public country: string;
  public city: string;
  public homeAddress: string;
  public salt: string;

  public constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
    this.approved = user.approved;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.dateOfBirth = user.dateOfBirth;
    this.gender = user.gender;
    this.country = user.country;
    this.city = user.city;
    this.homeAddress = user.homeAddress;
    this.userType = user.userType;
    this.phoneNumber = user.phoneNumber;
    this.instagramId = user.instagramId;
    this.facebookId = user.facebookId;
  }
}
