import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.schema';
import { CreateBookingDto } from './booking.dto';
import { MESSAGE_COMMON } from 'src/constants/help';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
  ) {}

  async getAllBooking() {
    const result = await this.bookingModel.find().populate({
      path: 'car',
    });
    return {
      data: result,
    };
  }

  async getBookingDetail(id: string) {
    const result = await this.bookingModel.findById(id);
    return {
      data: result,
    };
  }

  async createBooking(booking: CreateBookingDto) {
    try {
      await this.bookingModel.create(booking);
      return {
        created: true,
        message: MESSAGE_COMMON.CREATED_SUCCESSFULLY,
      };
    } catch (error) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }

  async updateBooking(id: string, booking: CreateBookingDto) {
    try {
      await this.bookingModel.findByIdAndUpdate(id, booking);
      return {
        updated: true,
        message: MESSAGE_COMMON.UPDATED_SUCCESSFULLY,
      };
    } catch (error) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }
}
