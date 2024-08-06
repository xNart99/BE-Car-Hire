import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @ApiProperty()
  @IsNotEmpty()
  carname: string;

  @ApiProperty()
  @IsNotEmpty()
  make: string;

  @ApiProperty()
  @IsNotEmpty()
  modal: string;

  @ApiProperty()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  seats: number;

  @ApiProperty()
  @IsNotEmpty()
  doors: number;

  @ApiProperty()
  @IsNotEmpty()
  suit_cases: number;

  @ApiProperty()
  @IsNotEmpty()
  driving_age: number;

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  car_type: string;

  @ApiProperty()
  @IsNotEmpty()
  ac: boolean;

  @ApiProperty()
  @IsNotEmpty()
  hybrid: boolean;

  @ApiProperty()
  @IsNotEmpty()
  available: boolean;
}
