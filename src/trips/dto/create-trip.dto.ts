import { IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  user: string;
}