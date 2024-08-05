import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/auth/strategy';
import { BookingSchema } from './booking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Booking',
        schema: BookingSchema,
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.SECRET_KEY,
        signOptions: {
          expiresIn: process.env.EXPIRES_IN,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BookingService, JwtStrategy],
  controllers: [BookingController],
})
export class BookingModule {}
