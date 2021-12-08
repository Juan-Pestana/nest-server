import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(todo: CreateTodoDto): Promise<Todo> {
    const { ownerId, title, description, status } = todo;
    const owner = await this.userRepository.findOneOrFail(ownerId);
    const nTodo = { title, description, status, owner };
    const newTodo = this.todoRepository.create(nTodo);
    return this.todoRepository.save(newTodo);
    // const user = await this.userRepository.findOneOrFail(ownerId);
  }

  async findAll(status?: string, owner?: number): Promise<Todo[]> {
    if (status && owner) {
      if (status === 'true') {
        const todosByOwner = await this.todoRepository
          .createQueryBuilder('todos')
          .where('todos.owner = :owner AND todos.status = :status', {
            owner,
            status: true,
          })
          .getMany();
        return todosByOwner;
      }
      if (status === 'false') {
        const todosByOwner = await this.todoRepository
          .createQueryBuilder('todos')
          .where('todos.owner = :owner AND todos.status = :status', {
            owner,
            status: false,
          })
          .getMany();
        return todosByOwner;
      }
    }
    if (status === 'true') {
      const todosTrue = await this.todoRepository
        .createQueryBuilder('todos')
        .where('todos.status = :status', { status: true })
        .getMany();
      return todosTrue;
    }
    if (status === 'false') {
      const todosFalse = await this.todoRepository
        .createQueryBuilder('todos')
        .where('todos.status = :status', { status: false })
        .getMany();
      return todosFalse;
    }
    if (owner) {
      const todosByOwner = await this.todoRepository
        .createQueryBuilder('todos')
        .where('todos.owner = :owner', {
          owner,
        })
        .getMany();
      return todosByOwner;
    }

    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    try {
      const todo = await this.todoRepository.findOneOrFail(id);
      return todo;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todoToUpdate = await this.findOne(id);
    const updatedTodo = { ...todoToUpdate, ...updateTodoDto };
    return this.todoRepository.save(updatedTodo);
  }

  async remove(id: number): Promise<Todo> {
    const deleted = await this.findOne(id);

    return this.todoRepository.remove(deleted);
  }
}
