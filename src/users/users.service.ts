import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name); // Create logger instance

  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async info(req:Request, res: Response) {
    const { firstname, lastname } = req.body;
    try {
      res.cookie('firstname', firstname);
      res.cookie('lastname', lastname);
      return { firstname, lastname };
    } catch (error) {
      this.logger.error('Error setting cookies in info()', error.stack); // Log error
      throw error;
    }
  }

  async password(req:Request, res: Response) {
    const { password, password1 } = req.body;
    try {
      if (password === password1) {
        res.cookie('password', password);
        return { password };
      } else {
        return { message: 'Passwords do not match' };
      }
    } catch (error) {
      this.logger.error('Error handling passwords', error.stack); // Log error
      throw error;
    }
  }

  async verify(user: any, req: Request) {
    const { firstname, lastname, password, phone_number, otp: storedOtp } = user;
    const { otp} = req.body
    try {
      if (otp === storedOtp) {
        const newUser = this.userRepository.create({ firstname, lastname, password, phone_number });
        await this.userRepository.save(newUser);
        return { message: 'User created successfully' };
      } else {
        return { message: 'Invalid OTP' };
      }
    } catch (error) {
      this.logger.error('Error during OTP verification', error.stack); // Log error
      throw error;
    }
  }
}
