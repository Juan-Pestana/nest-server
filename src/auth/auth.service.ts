import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);

    if (user && password === user.password) {
      const { password, ...rest } = user;
      return rest;
    }
  }

  async login(user: any) {
    const payload = { name: user.name, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
