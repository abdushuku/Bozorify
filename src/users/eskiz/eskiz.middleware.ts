import { Injectable, NestMiddleware } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class EskizMiddleware implements NestMiddleware {
  private async authenticate():Promise<string> {
    try {
      const response: AxiosResponse<{data:{token:string}}> = await axios.post('https://notify.eskiz.uz/api/auth/login', {
        email: 'kholikulovelyor@gmail.com',
        password: 'lWMS8DpghTyKoxHalY8Rvi8OocKFLxYx4pWBSL9f',
      });
      return response.data.data.token;
    } catch (error) {
      console.error('Error authenticating:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  private async sendSms(token: string, message: string, recipient: string): Promise<void> {
    try {
      await axios.post('https://notify.eskiz.uz/api/message/sms/send', {
        mobile_phone: recipient,
        message: message,
        from: 'Bozorify',
      }, {
        headers: {
          Authorization: `Bearer ${token}`,  // Correct header is 'Authorization'
        },
      });
    } catch (error) {
      console.error('Error sending SMS:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const number = req.body.phone_number;
    if (!number) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);

    try {
      const token = await this.authenticate();
      await this.sendSms(token, `Bozorify miniappidan ro'yxatdan o'tish uchun kod : ${otp}`, number);
      req['otp'] = otp;
      next();
    } catch (error) {
      console.error('Error in Eskiz Middleware:', error);
      return res.status(500).json({ message: 'Error processing request', error: error.message });
    }
  }
}
