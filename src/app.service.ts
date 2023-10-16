import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria um novo usuário com os dados fornecidos.
   *
   * @param userData - Dados do usuário a serem criados.
   * @returns Uma promessa que resolve em um objeto do tipo User criado.
   */
  async createUser(userData: Prisma.UserCreateInput): Promise<User> {
    const result = await this.prisma.user.create({
      data: userData,
    });
    return result;
  }

  /**
   * Obtém um usuário por ID.
   *
   * @param userId - O ID do usuário a ser obtido.
   * @returns Uma promessa que resolve em um objeto do tipo User.
   */
  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  /**
   * Lista todos os usuários.
   *
   * @returns Uma lista de objetos do tipo User.
   */
  async listUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
