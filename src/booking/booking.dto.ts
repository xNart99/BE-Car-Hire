import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  bookingRef: string;

  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  dob: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  fromDate: string;

  @ApiProperty()
  @IsNotEmpty()
  toDate: string;

  @ApiProperty()
  @IsNotEmpty()
  hiringDuration: number;

  @ApiProperty()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsNotEmpty()
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  car: string;
}

export class UpdateBookingDto extends CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  carOld: string;
}

export class SearchBooking {
  @ApiProperty()
  @IsNotEmpty()
  bookingRef: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
}
