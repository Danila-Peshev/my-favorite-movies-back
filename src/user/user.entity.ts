import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FavoriteGenre } from 'src/genre/favorite-genre.entity';
import { FavoriteMovie } from 'src/movie/favorite-movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @Field((type) => [FavoriteMovie])
  @OneToMany(() => FavoriteMovie, (favoriteMovie) => favoriteMovie.user)
  favoriteMovies: FavoriteMovie[];

  @Field((type) => [FavoriteGenre])
  @OneToMany(() => FavoriteGenre, (favoriteGenre) => favoriteGenre.user)
  favoriteGenres: FavoriteGenre[];
}

export { FavoriteMovie, FavoriteGenre };
