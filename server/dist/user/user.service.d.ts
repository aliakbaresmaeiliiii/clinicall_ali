import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        address: string | null;
        email: string;
        password: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        id: number;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        address: string | null;
        email: string;
        password: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        id: number;
        createdAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        address: string | null;
        email: string;
        password: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        id: number;
        createdAt: Date;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        address: string | null;
        email: string;
        password: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        id: number;
        createdAt: Date;
    }>;
    remove(id: number): Promise<{
        address: string | null;
        email: string;
        password: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        id: number;
        createdAt: Date;
    }>;
}
