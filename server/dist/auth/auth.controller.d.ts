import { AuthService } from './auth.service';
import { RegisterClinicDto } from './dto/register-clinic.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { UpdatePatientProfileDto } from './dto/update-patient-profile.dto';
import { PatientEmailSignInDto } from './dto/patient-email-sign-in.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerClinic(registerClinicDto: RegisterClinicDto): Promise<{
        statusCode: number;
        message: string;
        data: {
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
        };
    }>;
    registerPatient(registerPatientDto: RegisterPatientDto): Promise<{
        statusCode: number;
        message: string;
        data: {
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
        };
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
    clinicSignIn(req: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            access_token: string;
            refresh_token: string;
            user: {
                id: any;
                email: any;
                userType: string;
                isVerified: any;
            };
        };
    }>;
    doctorSignIn(req: any): Promise<{
        statusCode: number;
        message: string;
        data: {
            access_token: string;
            refresh_token: string;
            user: {
                id: any;
                email: any;
                userType: string;
                isVerified: any;
            };
        };
    }>;
    patientSignIn(patientEmailSignInDto: PatientEmailSignInDto): Promise<{
        statusCode: number;
        message: string;
        data: {
            access_token: string;
            refresh_token: string;
            user: {
                id: any;
                email: any;
                userType: string;
                isVerified: any;
            };
        };
    }>;
    refreshToken(body: {
        refresh_token: string;
    }): Promise<{
        statusCode: number;
        message: string;
        data: {
            access_token: string;
        };
    }>;
    logout(body: {
        refresh_token: string;
    }): Promise<{
        statusCode: number;
        message: string;
        data: {
            message: string;
        };
    }>;
    getPatientProfile(patientId: number): Promise<{
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
    updatePatientProfile(patientId: number, updatePatientProfileDto: UpdatePatientProfileDto): Promise<{
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
    verifyRecaptcha(body: {
        token: string;
    }): Promise<{
        success: boolean;
    }>;
}
