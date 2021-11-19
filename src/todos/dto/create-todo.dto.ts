import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(30)
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: boolean;
}
