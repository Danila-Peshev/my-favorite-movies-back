import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserFavoriteMovie } from './userFavoriteMovie.entity';
import { UserFavoriteMovieController } from './userFavoriteMovie.controller';
import { UserFavoriteMovieService } from './userFavoriteMovie.service';

@Module({
  controllers: [UserFavoriteMovieController],
  providers: [UserFavoriteMovieService],
  imports: [TypeOrmModule.forFeature([UserFavoriteMovie]), UserModule],
})
export class UserFavoriteMovieModule {}
