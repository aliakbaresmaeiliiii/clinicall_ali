import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAdminDto: CreateAdminDto): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        createdAt: Date;
    }>;
    update(id: number, updateAdminDto: UpdateAdminDto): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        createdAt: Date;
    }>;
}
