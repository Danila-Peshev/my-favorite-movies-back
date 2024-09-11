import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class FavoriteMovie {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field((type) => User)
  @ManyToOne(() => User, (user) => user.favoriteMovies, { onDelete: 'CASCADE' })
  user: User;

  @Field()
  @Column()
  movieId: number;

  @Field()
  @Column()
  isWatched: boolean;
}
