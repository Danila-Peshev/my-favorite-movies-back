import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserFavoriteMovie } from '../user-movie/userFavoriteMovie.entity';
import { UserWatchedMovie } from '../user-watched-movie/userWatchedMovie.entity';
import { UserFavoriteGenre } from '../user-genre/userFavoriteGenre.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(
    () => UserFavoriteMovie,
    (userFavoriteMovie) => userFavoriteMovie.user,
  )
  favoriteMovies: UserFavoriteMovie[];

  @OneToMany(
    () => UserFavoriteGenre,
    (userFavoriteGenre) => userFavoriteGenre.user,
  )
  favoriteGenres: UserFavoriteGenre[];

  @OneToMany(
    () => UserWatchedMovie,
    (userWatchedMovie) => userWatchedMovie.user,
  )
  watchedMovies: UserWatchedMovie[];
}

export { UserFavoriteMovie, UserFavoriteGenre, UserWatchedMovie };
