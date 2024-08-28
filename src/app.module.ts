import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { config } from 'dotenv';
import { AuthModule } from './auth/auth.module';
import { UserFavoriteGenreModule } from './user-genre/userFavoriteGenre.module';
import { UserFavoriteMovieModule } from './user-movie/userFavoriteMovie.module';
import { UserWatchedMovieModule } from './user-watched-movie/userWatchedMovie.module';
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
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'migrations', '*{.ts, .js}')],
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    AuthModule,
    UserFavoriteGenreModule,
    UserFavoriteMovieModule,
    UserWatchedMovieModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
