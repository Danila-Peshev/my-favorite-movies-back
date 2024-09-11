import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class FavoriteGenre {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => User)
  @ManyToOne(() => User, (user) => user.favoriteGenres, { onDelete: 'CASCADE' })
  user: User;

  @Field()
  @Column()
  genreId: number;
}
