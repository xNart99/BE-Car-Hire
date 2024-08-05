import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './car.schema';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Car',
        schema: CarSchema,
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
  controllers: [CarController],
  providers: [CarService, JwtStrategy],
})
export class CarModule {}
