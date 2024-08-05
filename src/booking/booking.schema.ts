import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';
import { Car } from 'src/car/car.schema';

@Schema()
export class Booking {
  @Prop({
    required: true,
  })
  available: boolean;

  @Prop({
    required: true,
  })
  bookingRef: string;

  @Prop({
    required: true,
  })
  dob: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  firstName: string;

  @Prop({
    required: true,
  })
  lastName: string;
  @Prop({
    required: true,
  })
  fromDate: string;
  @Prop({
    required: true,
  })
  toDate: string;
  @Prop({
    required: true,
  })
  hiringDuration: number;
  @Prop({
    required: true,
  })
  location: string;
  @Prop({
    required: true,
  })
  phone: string;
  @Prop({
    required: true,
    enum: ['PENDING', 'PROGRESSING', 'COMPLETED', 'CANCELED'],
  })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Car.name,
  })
  @Type(() => Car)
  car: Car;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
