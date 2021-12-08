import { ApiProperty } from '@nestjs/swagger';
import { Max, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @MaxLength(30)
  password: string;

  @ApiProperty()
  @MaxLength(30)
  username: string;

  @ApiProperty()
  @Max(99)
  age: number;

  @ApiProperty({ required: false })
  married?: boolean;
}
