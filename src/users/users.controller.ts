import { Controller, Post, Body, Req, Res, Get, Put, Patch } from '@nestjs/common';
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

  @Get('/login')
  async userLogin(@Req() req:Request, @Res({passthrough: true}) res:Response){
    const { phone_number } = req.body;
    const otp = req['otp']
    console.log(otp);
    
    res.cookie('otp', otp)
    res.cookie('phone_number', phone_number)
    return {'message': 'OTP sent successfully'}
  }

  @Get('/password')
  async password(@Req() req:Request ,@Res({ passthrough: true }) res: Response) {
    return this.usersService.password(req, res);
  }

  @Post('/phone-number')
  async phoneNumber(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.usersService.login(req, res)
  }

  @Get('/login/verification')
  async loginVerification(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.usersService.loginVerification(req, res)
  }

  @Post('/verify')
  async verify(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.cookies; // Ensure cookies are properly parsed in the application
    return this.usersService.verify(user, req);
  }

  @Patch('/gender')
  async updateUserGender(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.usersService.updateUserGender(req, res)
  }
}
