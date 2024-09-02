import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { config } from 'dotenv';
import { FavoriteGenre } from '../src/genre/favoriteGenre.entity';
import { FavoriteMovie } from '../src/movie/favoriteMovie.entity';
import { User } from '../src/user/user.entity';
config();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [FavoriteGenre, FavoriteMovie, User],
      migrations: [join(__dirname, 'migrations', '*{.ts, .js}')],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
