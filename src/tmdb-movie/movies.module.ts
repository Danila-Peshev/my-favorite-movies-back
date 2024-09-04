import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { HttpModule } from '@nestjs/axios';

const baseURL = process.env.TMDB_BASE_URL;

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN_AUTH}`,
};

@Module({
  imports: [
    HttpModule.register({
      baseURL,
      headers,
      timeout: 15000,
    }),
  ],
  providers: [MoviesService],
})
export class MoviesModule {}
