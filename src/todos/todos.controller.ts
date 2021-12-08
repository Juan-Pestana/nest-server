import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Todo } from './entities/todo.entity';

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @ApiOkResponse({ type: [Todo] })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'owner', required: false })
  @Get()
  findAll(@Query('status') status: string, @Query('owner') owner: string) {
    return this.todosService.findAll(status, +owner);
  }

  @ApiOkResponse({ type: Todo })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const todo = this.todosService.findOne(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }

  @ApiOkResponse({ type: Todo })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    const updated = this.todosService.update(id, updateTodoDto);
    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  @ApiOkResponse({ type: Todo })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todosService.remove(id);
  }
}
