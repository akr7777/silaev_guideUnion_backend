import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { jwtConstants } from './jwt.setting';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
      secret: jwtConstants.secret,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
