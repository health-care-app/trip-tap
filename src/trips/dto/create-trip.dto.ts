import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  public name: string;

}
