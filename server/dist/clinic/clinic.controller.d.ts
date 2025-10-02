import { ClinicService } from './clinic.service';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
export declare class ClinicController {
    private readonly clinicService;
    constructor(clinicService: ClinicService);
    create(createClinicDto: CreateClinicDto): Promise<{
        address: string | null;
        name: string | null;
        email: string;
        description: string | null;
        password: string | null;
        phone: string | null;
        website: string | null;
        verifyCode: string | null;
        id: number;
        logo: string | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        clinicDoctors: ({
            doctor: {
                email: string;
                password: string | null;
                phone: string | null;
                verifyCode: string | null;
                firstName: string | null;
                lastName: string | null;
                gender: string | null;
                age: number | null;
                id: number;
                createdAt: Date;
                tokenVerify: string | null;
                profileImg: string | null;
                medicalCode: string | null;
                clickCount: number;
                isLiked: boolean;
                averageRating: number;
                totalRatings: number;
                specialityId: number | null;
                serviceId: number | null;
                visitHistoryId: number | null;
            };
        } & {
            id: number;
            createdAt: Date;
            doctorId: number;
            clinicId: number;
        })[];
        appointments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            doctorId: number;
            clinicId: number;
            patientId: number;
            date: Date;
            time: string;
            status: string;
            notes: string | null;
        }[];
    } & {
        address: string | null;
        name: string | null;
        email: string;
        description: string | null;
        password: string | null;
        phone: string | null;
        website: string | null;
        verifyCode: string | null;
        id: number;
        logo: string | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        clinicDoctors: ({
            doctor: {
                email: string;
                password: string | null;
                phone: string | null;
                verifyCode: string | null;
                firstName: string | null;
                lastName: string | null;
                gender: string | null;
                age: number | null;
                id: number;
                createdAt: Date;
                tokenVerify: string | null;
                profileImg: string | null;
                medicalCode: string | null;
                clickCount: number;
                isLiked: boolean;
                averageRating: number;
                totalRatings: number;
                specialityId: number | null;
                serviceId: number | null;
                visitHistoryId: number | null;
            };
        } & {
            id: number;
            createdAt: Date;
            doctorId: number;
            clinicId: number;
        })[];
        appointments: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            doctorId: number;
            clinicId: number;
            patientId: number;
            date: Date;
            time: string;
            status: string;
            notes: string | null;
        }[];
    } & {
        address: string | null;
        name: string | null;
        email: string;
        description: string | null;
        password: string | null;
        phone: string | null;
        website: string | null;
        verifyCode: string | null;
        id: number;
        logo: string | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateClinicDto: UpdateClinicDto): Promise<{
        address: string | null;
        name: string | null;
        email: string;
        description: string | null;
        password: string | null;
        phone: string | null;
        website: string | null;
        verifyCode: string | null;
        id: number;
        logo: string | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        address: string | null;
        name: string | null;
        email: string;
        description: string | null;
        password: string | null;
        phone: string | null;
        website: string | null;
        verifyCode: string | null;
        id: number;
        logo: string | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
