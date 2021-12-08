import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty({ required: false })
  married?: boolean;
}
