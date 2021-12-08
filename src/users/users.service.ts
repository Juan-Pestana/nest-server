import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(name?: string): Promise<User[]> {
    if (name) {
      const usersByName = await this.userRepository
        .createQueryBuilder('user')
        .where('user.name = :name', { name: name })
        .getMany();
      return usersByName;
    }
    return this.userRepository.find({
      relations: ['todos'],
    });
  }

  async findById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(username: string): Promise<User> {
    const user = await this.userRepository.find({
      where: { username: username },
    });
    console.log('on service', user);

    return user[0];
  }

  createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async updateUser(id: number, user: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.findById(id);
    const updatedUser = { ...userToUpdate, ...user };
    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number): Promise<User> {
    const userTodelete = await this.findById(id);
    return this.userRepository.remove(userTodelete);
  }
}
