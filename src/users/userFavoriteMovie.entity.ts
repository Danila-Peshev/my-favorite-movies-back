import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class UserFavoriteMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favoriteMovies, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  movieId: number;
}
