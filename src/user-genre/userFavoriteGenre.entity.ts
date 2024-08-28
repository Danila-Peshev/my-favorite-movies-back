import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class UserFavoriteGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favoriteGenres, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  genreId: number;
}
