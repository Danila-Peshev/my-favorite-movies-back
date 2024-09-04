import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class FavoriteGenre {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.favoriteGenres, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  genreId: number;
}
