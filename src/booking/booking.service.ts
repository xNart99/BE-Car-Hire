import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.schema';
import {
  CreateBookingDto,
  SearchBooking,
  UpdateBookingDto,
} from './booking.dto';
import { MESSAGE_COMMON, STATUS } from 'src/constants/help';
import { Car } from 'src/car/car.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
    @InjectModel('Car') private readonly carModel: Model<Car>,
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
    const result = await this.bookingModel.findById(id).populate({
      path: 'car',
    });
    return {
      data: result,
    };
  }

  async getBookingClient(payload: SearchBooking) {
    const result = await this.bookingModel
      .findOne({
        bookingRef: payload.bookingRef,
        lastName: {
          $regex: payload.lastName,
          $options: 'i',
        },
      })
      .populate({
        path: 'car',
      });
    return {
      data: result,
    };
  }

  async overView() {
    const totalBooking = await this.bookingModel.find();
    const bookingPending = totalBooking.filter(
      (item) => item.status === STATUS.PENDING,
    ).length;
    const bookingComplete = totalBooking.filter(
      (item) => item.status === STATUS.COMPLETED,
    ).length;
    const bookingCancel = totalBooking.filter(
      (item) => item.status === STATUS.CANCELED,
    ).length;
    const bookingProgress = totalBooking.filter(
      (item) => item.status === STATUS.PROGRESSING,
    ).length;

    return {
      totalBooking: totalBooking.length,
      bookingPending,
      bookingComplete,
      bookingCancel,
      bookingProgress,
    };
  }

  async createBooking(booking: CreateBookingDto) {
    try {
      await this.bookingModel.create(booking);
      await this.carModel.findByIdAndUpdate(booking.car, {
        available: false,
      });
      return {
        created: true,
        message: MESSAGE_COMMON.CREATED_SUCCESSFULLY,
      };
    } catch (error) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }

  async updateBooking(id: string, booking: UpdateBookingDto) {
    try {
      await this.bookingModel.findByIdAndUpdate(id, booking);
      await this.carModel.findByIdAndUpdate(booking.carOld, {
        available: true,
      });
      await this.carModel.findByIdAndUpdate(booking.car, {
        available: false,
      });
      return {
        updated: true,
        message: MESSAGE_COMMON.UPDATED_SUCCESSFULLY,
      };
    } catch (error) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }
}
