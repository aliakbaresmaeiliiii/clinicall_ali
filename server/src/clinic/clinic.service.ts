import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClinicService {
  constructor(private prisma: PrismaService) {}

  async create(createClinicDto: CreateClinicDto) {
    const { 
      password,
      confirmPassword, // Validated by DTO, not used here
      owner_name,
      city,
      state,
      zip_code,
      country,
      ...rest 
    } = createClinicDto;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Build comprehensive address if additional location fields are provided
    let fullAddress = rest.address;
    if (city || state || zip_code || country) {
      const addressParts = [];
      if (rest.address) addressParts.push(rest.address);
      if (city) addressParts.push(city);
      if (state) addressParts.push(state);
      if (zip_code) addressParts.push(zip_code);
      if (country) addressParts.push(country);
      fullAddress = addressParts.join(', ');
    }

    // Use owner_name as name if provided and name is not provided
    const clinicName = rest.name || owner_name || 'Clinic';

    return this.prisma.clinic.create({
      data: {
        ...rest,
        name: clinicName,
        password: hashedPassword,
        address: fullAddress,
        ownerName: owner_name,
        city,
        state,
        zipCode: zip_code,
        country,
      },
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

    const { 
      password,
      confirmPassword, // Validated by DTO, not used here
      owner_name,
      city,
      state,
      zip_code,
      country,
      ...rest 
    } = updateClinicDto;

    const updateData: any = { ...rest };

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Build comprehensive address if additional location fields are provided
    if (city || state || zip_code || country) {
      const addressParts = [];
      if (rest.address) addressParts.push(rest.address);
      if (city) addressParts.push(city);
      if (state) addressParts.push(state);
      if (zip_code) addressParts.push(zip_code);
      if (country) addressParts.push(country);
      updateData.address = addressParts.join(', ');
    }

    // Use owner_name as name if provided
    if (owner_name && !rest.name) {
      updateData.name = owner_name;
    }

    // Add new fields
    if (owner_name !== undefined) {
      updateData.ownerName = owner_name;
    }
    if (city !== undefined) {
      updateData.city = city;
    }
    if (state !== undefined) {
      updateData.state = state;
    }
    if (zip_code !== undefined) {
      updateData.zipCode = zip_code;
    }
    if (country !== undefined) {
      updateData.country = country;
    }

    return this.prisma.clinic.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number) {
    const clinic = await this.findOne(id);

    return this.prisma.clinic.delete({
      where: { id },
    });
  }
}
