import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserWatchedMovieController } from './userWatchedMovie.controller';
import { UserWatchedMovieService } from './userWatchedMovie.service';
import { UserWatchedMovie } from './userWatchedMovie.entity';

@Module({
  controllers: [UserWatchedMovieController],
  providers: [UserWatchedMovieService],
  imports: [TypeOrmModule.forFeature([UserWatchedMovie]), UserModule],
})
export class UserWatchedMovieModule {}
