import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
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
    findOne(id: string): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        createdAt: Date;
    }>;
    update(id: string, updateAdminDto: UpdateAdminDto): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        id: number;
        createdAt: Date;
    }>;
}
