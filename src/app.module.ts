import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { EskizMiddleware } from './users/eskiz/eskiz.middleware';



@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer
      .apply(EskizMiddleware)
      .forRoutes({ path: 'users/phone-number', method: RequestMethod.POST })
  }
}


