import { TypeOrmModule } from "@nestjs/typeorm";
import { UserFavoriteGenreController } from "./userFavoriteGenre.controller";
import { UserFavoriteGenreService } from "./userFavoriteGenre.service";
import { Module } from '@nestjs/common';
import { UserFavoriteGenre } from "./userFavoriteGenre.entity";
import { UserModule } from "src/user/user.module";

@Module({
  controllers: [UserFavoriteGenreController],
  providers: [UserFavoriteGenreService],
  imports: [TypeOrmModule.forFeature([UserFavoriteGenre]), UserModule]
})

export class UserFavoriteGenreModule {}
