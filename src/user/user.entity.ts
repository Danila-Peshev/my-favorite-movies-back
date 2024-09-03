import { FavoriteGenre } from 'src/genre/favorite-genre.entity';
import { FavoriteMovie } from 'src/movie/favorite-movie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => FavoriteMovie, (favoriteMovie) => favoriteMovie.user)
  favoriteMovies: FavoriteMovie[];

  @OneToMany(() => FavoriteGenre, (favoriteGenre) => favoriteGenre.user)
  favoriteGenres: FavoriteGenre[];
}

export { FavoriteMovie, FavoriteGenre };
