import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateTodoDto {
  @ApiProperty()
  @MaxLength(30)
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  ownerId: number;
}
