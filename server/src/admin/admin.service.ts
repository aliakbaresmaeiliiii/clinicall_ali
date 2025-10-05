import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(createAdminDto: CreateAdminDto) {
    return this.prisma.admin.create({
      data: createAdminDto,
    });
  }

  async findAll() {
    return this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      throw new NotFoundException('Admin not found');
    }

    return admin;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    return this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  async remove(id: number) {
    const admin = await this.findOne(id);

    return this.prisma.admin.delete({
      where: { id },
    });
  }
}
