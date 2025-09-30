import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: createAppointmentDto,
      include: {
        doctor: true,
        patient: true,
        clinic: true,
      },
    });
  }

  async findAll() {
    return this.prisma.appointment.findMany({
      include: {
        doctor: true,
        patient: true,
        clinic: true,
      },
    });
  }

  async findOne(id: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        doctor: true,
        patient: true,
        clinic: true,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);
    
    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
      include: {
        doctor: true,
        patient: true,
        clinic: true,
      },
    });
  }

  async remove(id: number) {
    const appointment = await this.findOne(id);
    
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
