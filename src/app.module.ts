import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './events/events.module';
import { NewsModule } from './news/news.module';
import { UserModule } from './users/user.module';

console.log(process.env.TOKEN_SECRET, 'process.env.TOKEN_SECRET');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      url: process.env.NEON_URL,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([]),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
    }),
    AuthModule,
    NewsModule,
    EventModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
