import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Car } from './car.schema';
import { Model } from 'mongoose';
import { MESSAGE_COMMON } from 'src/constants/help';
import { CreateCarDto } from './car.dto';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private readonly carModel: Model<Car>) {}

  async searchCar(location) {
    const result = await this.carModel.find({
      available: true,
      location: {
        $regex: location,
        $options: 'i',
      },
    });
    return {
      data: result,
    };
  }

  async overView() {
    const totalCar = await this.carModel.find();
    const carAvailables = totalCar.filter((item) => item.available).length;
    const carUnavailabes = totalCar.filter((item) => !item.available).length;

    return {
      totalCar: totalCar.length,
      carAvailables,
      carUnavailabes,
    };
  }

  async getAllCar() {
    const result = await this.carModel.find();
    return {
      data: result,
    };
  }

  async getCarDetail(id: string) {
    const result = await this.carModel.findById(id);
    return {
      data: result,
    };
  }

  async createCar(car: CreateCarDto) {
    try {
      await this.carModel.create(car);
      return {
        created: true,
        message: MESSAGE_COMMON.CREATED_SUCCESSFULLY,
      };
    } catch (error) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteCar(id: string) {
    try {
      await this.carModel.findByIdAndDelete(id);
      return {
        deleted: true,
        message: MESSAGE_COMMON.DELETED_SUCCESSFULLY,
      };
    } catch (erro) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }

  async updateCar(id: string, car: CreateCarDto) {
    try {
      await this.carModel.findByIdAndUpdate(id, car);
      return {
        updated: true,
        message: MESSAGE_COMMON.UPDATED_SUCCESSFULLY,
      };
    } catch (error) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }
}
