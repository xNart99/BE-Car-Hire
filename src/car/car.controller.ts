import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCarDto } from './car.dto';

@ApiTags('cars')
@ApiBearerAuth()
@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get('/search/:location')
  searchCars(@Param('location') location: string) {
    return this.carService.searchCar(location);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('overview')
  getCarOverview() {
    return this.carService.overView();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAllCars() {
    return this.carService.getAllCar();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/details/:id')
  getCarDetail(@Param('id') id: string) {
    return this.carService.getCarDetail(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createCar(@Body() car: CreateCarDto) {
    return this.carService.createCar(car);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.carService.deleteCar(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('/update/:id')
  updateUser(@Param('id') id: string, @Body() car: CreateCarDto) {
    return this.carService.updateCar(id, car);
  }
}
