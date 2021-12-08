import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @MaxLength(30)
  username: string;

  @ApiProperty()
  @MinLength(4)
  password: string;
}
