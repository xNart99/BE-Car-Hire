import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookingDto } from './booking.dto';
@ApiTags('bookings')
@ApiBearerAuth()
@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllCars() {
    return this.bookingService.getAllBooking();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/details/:id')
  getCarDetail(@Param('id') id: string) {
    return this.bookingService.getBookingDetail(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createCar(@Body() booking: CreateBookingDto) {
    return this.bookingService.createBooking(booking);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() booking: CreateBookingDto) {
    return this.bookingService.updateBooking(id, booking);
  }
}
