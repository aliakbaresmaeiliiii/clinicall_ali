import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    return this.prisma.patient.create({
      data: createPatientDto,
    });
  }

  async findAll() {
    return this.prisma.patient.findMany({
      include: {
        appointments: true,
        reviews: true,
        medicalRecords: true,
      },
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
        reviews: true,
        medicalRecords: true,
      },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);

    return this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
  }

  async remove(id: number) {
    const patient = await this.findOne(id);

    return this.prisma.patient.delete({
      where: { id },
    });
  }
}
