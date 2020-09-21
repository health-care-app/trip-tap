import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  public name: string;

  @IsOptional()
  @IsString()
  public description: string;

  @IsOptional()
  @IsString()
  public image: string;

  @IsOptional()
  @IsString()
  public comment: string;

  @IsOptional()
  public date: Date[];
}
