import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 0, name: 'Juan', age: 39, married: true },
    { id: 1, name: 'Blanca', age: 37, married: true },
    { id: 2, name: 'Carlos', age: 35, married: false },
    { id: 3, name: 'Victor', age: 33, married: false },
  ];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter((user) => user.name === name);
    } else {
      return this.users;
    }
  }

  findById(id: number): User {
    return this.users.find((user) => user.id === id);
  }
  createUser(user: CreateUserDto): User {
    const newUser = {
      id: Date.now(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}
