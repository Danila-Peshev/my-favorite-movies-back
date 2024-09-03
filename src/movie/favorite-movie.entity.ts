import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class FavoriteMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favoriteMovies, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  movieId: number;

  @Column()
  isWatched: boolean;
}
