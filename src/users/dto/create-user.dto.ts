import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, Max, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(30)
  name: string;

  @ApiProperty()
  @Max(99)
  age: number;

  @ApiProperty({ required: false })
  married?: boolean;
}
