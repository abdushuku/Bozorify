import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: 'u1j8jhs4yhboub6jlwgy',
          password: '8zck3SVU0i5sm2ag5c0zX4hHJZiREU',
          database: configService.get('DB_DATABASE'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: false,
        }),
        inject: [ConfigService],
      }),
    ],
  })
export class DatabaseModule {}