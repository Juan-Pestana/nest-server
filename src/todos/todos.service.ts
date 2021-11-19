import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 0,
      title: 'Learn TypeORM',
      description: 'esto debe ser un string',
      status: true,
    },
    {
      id: 1,
      title: 'Learn Auth',
      description: 'esto es más complicado',
      status: true,
    },
    {
      id: 2,
      title: 'Learn FastApi',
      description: 'Algo de Python habrá que aprender',
      status: false,
    },
    {
      id: 3,
      title: 'Refresh Next',
      description: 'Van muy rápido y hay muchas cosas nuevas',
      status: false,
    },
  ];

  create(todo: CreateTodoDto) {
    const newTodo = { id: Date.now(), ...todo };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(status?: string): Todo[] {
    if (status === 'true') {
      return this.todos.filter((todo) => todo.status === true);
    }
    if (status === 'false') {
      return this.todos.filter((todo) => todo.status === false);
    }

    return this.todos;
  }

  findOne(id: number): Todo {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return;
    }
    const updated = { id, ...updateTodoDto };
    this.todos[index] = updated;
    return updated;
  }

  remove(id: number): Todo {
    const deleted = this.todos.find((todo) => todo.id === id);
    this.todos = this.todos.filter((todo) => todo.id !== deleted.id);
    return deleted;
  }
}
