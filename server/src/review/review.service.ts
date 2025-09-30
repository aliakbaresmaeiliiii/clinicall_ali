import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: createReviewDto,
      include: {
        doctor: true,
        patient: true,
      },
    });
  }

  async findAll() {
    return this.prisma.review.findMany({
      include: {
        doctor: true,
        patient: true,
      },
    });
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({
      where: { id },
      include: {
        doctor: true,
        patient: true,
      },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    const review = await this.findOne(id);
    
    return this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
      include: {
        doctor: true,
        patient: true,
      },
    });
  }

  async remove(id: number) {
    const review = await this.findOne(id);
    
    return this.prisma.review.delete({
      where: { id },
    });
  }
}
