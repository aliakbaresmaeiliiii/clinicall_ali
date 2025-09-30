import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    findOne(id: string): Promise<{
        address: string | null;
        email: string;
        password: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        id: number;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        address: string | null;
        email: string;
        password: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        id: number;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
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
