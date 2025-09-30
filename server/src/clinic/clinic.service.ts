import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async create(createClinicDto: CreateClinicDto) {
    return this.prisma.clinic.create({
      data: createClinicDto,
    });
  }

  async findAll() {
    return this.prisma.clinic.findMany({
      include: {
        clinicDoctors: {
          include: {
            doctor: true,
          },
        },
        appointments: true,
      },
    });
  }

  async findOne(id: number) {
    const clinic = await this.prisma.clinic.findUnique({
      where: { id },
      include: {
        clinicDoctors: {
          include: {
            doctor: true,
          },
        },
        appointments: true,
      },
    });

    if (!clinic) {
      throw new NotFoundException('Clinic not found');
    }

    return clinic;
  }

  async update(id: number, updateClinicDto: UpdateClinicDto) {
    const clinic = await this.findOne(id);
    
    return this.prisma.clinic.update({
      where: { id },
      data: updateClinicDto,
    });
  }

  async remove(id: number) {
    const clinic = await this.findOne(id);
    
    return this.prisma.clinic.delete({
      where: { id },
    });
  }
}
