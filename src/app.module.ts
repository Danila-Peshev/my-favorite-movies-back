import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import dataSourceOptions from './data-source-options.config';
import { FavoriteGenreModule } from './genre/favorite-genre.module';
import { FavoriteMovieModule } from './movie/favorite-movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.example'],
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    FavoriteGenreModule,
    FavoriteMovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
