import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteMovie } from '../movie/favoriteMovie.entity';
import { FavoriteGenre } from 'src/genre/favoriteGenre.entity';

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
