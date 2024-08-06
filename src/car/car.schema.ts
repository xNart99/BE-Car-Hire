import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Car {
  @Prop({
    required: true,
  })
  carname: string;

  @Prop({
    required: true,
  })
  make: string;

  @Prop({
    required: true,
  })
  modal: string;

  @Prop({
    required: true,
  })
  year: string;

  @Prop({
    required: true,
  })
  seats: string;

  @Prop({
    required: true,
  })
  doors: string;

  @Prop({
    required: true,
  })
  suit_cases: string;

  @Prop({
    required: true,
  })
  driving_age: string;

  @Prop({
    required: true,
  })
  location: string;

  @Prop({
    required: true,
  })
  price: string;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    required: true,
    enum: ['AUTOMATIC', 'MANUAL'],
  })
  car_type: string;

  @Prop({
    required: true,
  })
  ac: boolean;

  @Prop({
    required: true,
  })
  hybrid: boolean;

  @Prop({
    required: true,
  })
  available: boolean;
}

export const CarSchema = SchemaFactory.createForClass(Car);
