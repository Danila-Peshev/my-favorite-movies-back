import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class UserWatchedMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.watchedMovies, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  movieId: number;
}
