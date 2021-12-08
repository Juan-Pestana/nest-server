import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthenticatedGuard } from './auth/jwt-authenticated.guard';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { LoginUserDto } from './users/dto/login-user.dto';

@Controller('app')
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req, @Body() body: LoginUserDto): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req): string {
    const msg = 'Well done!!!';
    return { ...req.user, msg };
  }
}
