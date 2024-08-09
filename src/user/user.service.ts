import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto, LoginUserDto } from './user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { MESSAGE_COMMON } from 'src/constants/help';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(userDto: CreateUserDto) {
    if (JSON.stringify(userDto) != '{}') {
      const user = await this.userModel
        .findOne({
          username: userDto.username,
        })
        .exec();
      if (!user) {
        try {
          userDto.password = await bcrypt.hash(userDto.password, 10);
          await this.userModel.create(userDto);
          return {
            created: true,
            message: MESSAGE_COMMON.CREATED_USER,
          };
        } catch (error) {
          throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
        }
      } else {
        throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUsers() {
    const result = await this.userModel.find({ role: { $ne: 'ADMIN' } });
    return {
      data: result,
    };
  }

  async getUserDetail(id: string) {
    const result = await this.userModel.findById(id);
    return {
      data: result,
    };
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.userModel
      .findOne({
        username: loginDto.username,
      })
      .exec();

    if (user) {
      const compare_password = bcrypt.compareSync(
        loginDto.password,
        user.password,
      );
      if (!compare_password) {
        throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
      } else {
        const token = this._createToken(loginDto);
        return {
          username: user.username,
          ...token,
          role: user.role,
        };
      }
    } else {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string) {
    try {
      await this.userModel.findByIdAndDelete(id);
      return {
        deleted: true,
        message: MESSAGE_COMMON.DELETED_USER,
      };
    } catch (erro) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, user: CreateUserDto) {
    try {
      if (user?.password != null) {
        user.password = await bcrypt.hash(user.password, 10);
        await this.userModel.findByIdAndUpdate(id, user);
      }
      await this.userModel.findByIdAndUpdate(id, user);
      return {
        updated: true,
        message: MESSAGE_COMMON.UPDATED_USER,
      };
    } catch (error) {
      throw new HttpException('Fail', HttpStatus.BAD_REQUEST);
    }
  }

  private _createToken({ username }): any {
    const accessToken = this.jwtService.sign({ username });
    return {
      accessToken,
    };
  }
}
