import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  status: boolean;
}