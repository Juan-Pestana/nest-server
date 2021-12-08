import { ApiProperty } from '@nestjs/swagger';
import { Todo } from 'src/todos/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  age: number;

  @ApiProperty({ required: false })
  @Column()
  married?: boolean;

  @OneToMany((type) => Todo, (todo) => todo.owner)
  todos: Todo[];
}
