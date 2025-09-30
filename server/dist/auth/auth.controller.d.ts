import { AuthService } from './auth.service';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerClinic(registerClinicDto: RegisterClinicDto): Promise<{
        address: string | null;
        name: string | null;
        email: string;
        description: string | null;
        phone: string | null;
        website: string | null;
        verifyCode: string | null;
        id: number;
        logo: string | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    registerPatient(registerPatientDto: RegisterPatientDto): Promise<{
        doctor: string | null;
        address: string | null;
        email: string;
        description: string | null;
        password: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        mobile: string | null;
        dateOfBirth: string | null;
        gender: string | null;
        age: number | null;
        maritalStatus: string | null;
        verifyCode: string | null;
        id: number;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        tokenVerify: string | null;
        patientName: string | null;
        bloodGroup: string | null;
        bloodPressure: string | null;
        sugarLevel: string | null;
        injury: string | null;
        profileImage: string | null;
        heartBeat: string | null;
        haemoglobin: string | null;
        treatment: string | null;
        charges: string | null;
    }>;
    verifyClinicEmail(verifyEmailDto: VerifyEmailDto): Promise<{
        address: string | null;
        name: string | null;
        email: string;
        description: string | null;
        phone: string | null;
        website: string | null;
        verifyCode: string | null;
        id: number;
        logo: string | null;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    verifyPatientEmail(verifyEmailDto: VerifyEmailDto): Promise<{
        doctor: string | null;
        address: string | null;
        email: string;
        description: string | null;
        phone: string | null;
        firstName: string | null;
        lastName: string | null;
        mobile: string | null;
        dateOfBirth: string | null;
        gender: string | null;
        age: number | null;
        maritalStatus: string | null;
        verifyCode: string | null;
        id: number;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        tokenVerify: string | null;
        patientName: string | null;
        bloodGroup: string | null;
        bloodPressure: string | null;
        sugarLevel: string | null;
        injury: string | null;
        profileImage: string | null;
        heartBeat: string | null;
        haemoglobin: string | null;
        treatment: string | null;
        charges: string | null;
    }>;
    clinicSignIn(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            userType: string;
        };
    }>;
    doctorSignIn(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            userType: string;
        };
    }>;
    patientSignIn(req: any): Promise<{
        access_token: string;
        user: {
            id: any;
            email: any;
            userType: string;
        };
    }>;
    verifyRecaptcha(body: {
        token: string;
    }): Promise<{
        success: boolean;
    }>;
}
