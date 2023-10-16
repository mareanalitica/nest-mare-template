import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { User, Prisma } from '@prisma/client';

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('create')
  async signupUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    return this.appService.createUser(userData);
  }

  @Get(':id')
  async getUser(@Param('id') userId: string): Promise<User | null> {
    return this.appService.getUserById(userId);
  }

  @Get()
  async listUsers(): Promise<User[]> {
    return this.appService.listUsers();
  }
}
