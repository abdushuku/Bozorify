import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/info')
  async info(@Req() req: Request ,@Res({ passthrough: true }) res: Response) {
    return this.usersService.info(req, res);
  }

  @Get('/password')
  async password(@Req() req:Request ,@Res({ passthrough: true }) res: Response) {
    return this.usersService.password(req, res);
  }

  @Post('/phone-number')
  async phoneNumber(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const {phone_number} = req.body
    const otp = req['otp']; // Ensure 'otp' is set in the request object
    res.cookie('phone_number', phone_number);
    res.cookie('otp', otp);
    const data =  { phone_number, otp };
    console.log(otp);
    
    return data
  }


  @Post('/verify')
  async verify(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.cookies; // Ensure cookies are properly parsed in the application
    return this.usersService.verify(user, req);
  }
}
