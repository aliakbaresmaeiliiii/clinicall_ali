"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const malaysianCities = [
    { name: 'Kuala Lumpur', state: 'Federal Territory' },
    { name: 'Petaling Jaya', state: 'Selangor' },
    { name: 'Subang Jaya', state: 'Selangor' },
    { name: 'Shah Alam', state: 'Selangor' },
    { name: 'Klang', state: 'Selangor' },
    { name: 'George Town', state: 'Penang' },
    { name: 'Ipoh', state: 'Perak' },
    { name: 'Johor Bahru', state: 'Johor' },
    { name: 'Malacca City', state: 'Malacca' },
    { name: 'Kota Kinabalu', state: 'Sabah' },
    { name: 'Kuching', state: 'Sarawak' },
    { name: 'Seremban', state: 'Negeri Sembilan' },
    { name: 'Kuantan', state: 'Pahang' },
    { name: 'Alor Setar', state: 'Kedah' },
    { name: 'Kangar', state: 'Perlis' },
    { name: 'Kuala Terengganu', state: 'Terengganu' },
    { name: 'Kota Bharu', state: 'Kelantan' },
];
const specialties = [
    { id: 1, name: 'General Practice', code: 'GP' },
    { id: 2, name: 'Cardiology', code: 'CARD' },
    { id: 3, name: 'Dermatology', code: 'DERM' },
    { id: 4, name: 'Pediatrics', code: 'PED' },
    { id: 5, name: 'Obstetrics & Gynecology', code: 'OBGYN' },
    { id: 6, name: 'Orthopedics', code: 'ORTHO' },
    { id: 7, name: 'Neurology', code: 'NEURO' },
    { id: 8, name: 'Psychiatry', code: 'PSY' },
    { id: 9, name: 'Ophthalmology', code: 'OPHTH' },
    { id: 10, name: 'ENT (Ear, Nose, Throat)', code: 'ENT' },
    { id: 11, name: 'Gastroenterology', code: 'GASTRO' },
    { id: 12, name: 'Urology', code: 'URO' },
    { id: 13, name: 'Endocrinology', code: 'ENDO' },
    { id: 14, name: 'Rheumatology', code: 'RHEUM' },
    { id: 15, name: 'Oncology', code: 'ONCO' },
    { id: 16, name: 'Nephrology', code: 'NEPH' },
    { id: 17, name: 'Pulmonology', code: 'PULM' },
    { id: 18, name: 'Hematology', code: 'HEMA' },
    { id: 19, name: 'Infectious Diseases', code: 'ID' },
    { id: 20, name: 'Emergency Medicine', code: 'EM' },
];
const services = [
    { id: 1, name: 'Consultation', code: 'CONS' },
    { id: 2, name: 'Diagnostic Tests', code: 'DIAG' },
    { id: 3, name: 'Minor Surgery', code: 'SURG' },
    { id: 4, name: 'Vaccination', code: 'VACC' },
    { id: 5, name: 'Health Screening', code: 'SCRN' },
    { id: 6, name: 'Follow-up Care', code: 'FUP' },
    { id: 7, name: 'Emergency Care', code: 'EMER' },
    { id: 8, name: 'Chronic Disease Management', code: 'CDM' },
];
const malaysianFirstNames = {
    male: [
        'Ahmad',
        'Mohammad',
        'Muhammad',
        'Abdul',
        'Ali',
        'Hassan',
        'Ibrahim',
        'Ismail',
        'Kamal',
        'Rahman',
        'Zainal',
        'Farid',
        'Hafiz',
        'Rizal',
        'Syed',
        'Wan',
        'Azman',
        'Firdaus',
        'Hakim',
        'Johan',
        'Khalid',
        'Luqman',
        'Nazri',
        'Osman',
        'Rashid',
    ],
    female: [
        'Aishah',
        'Fatimah',
        'Zainab',
        'Nurul',
        'Siti',
        'Mariam',
        'Rohani',
        'Salma',
        'Yasmin',
        'Zahra',
        'Amina',
        'Farah',
        'Hana',
        'Intan',
        'Jasmine',
        'Khadijah',
        'Laila',
        'Maimunah',
        'Nor',
        'Rahmah',
        'Sofia',
        'Tengku',
        'Umi',
        'Wan',
    ],
    lastNames: [
        'Abdullah',
        'Ali',
        'Hassan',
        'Ibrahim',
        'Ismail',
        'Mohammad',
        'Rahman',
        'Salleh',
        'Yusof',
        'Zainal',
        'Ahmad',
        'Bakar',
        'Chin',
        'Kumar',
        'Lee',
        'Lim',
        'Ng',
        'Tan',
        'Wong',
        'Goh',
        'Teh',
        'Ong',
        'Chan',
        'Cheah',
    ],
};
function generateMalaysianDoctors(count) {
    const doctors = [];
    for (let i = 1; i <= count; i++) {
        const gender = Math.random() > 0.5 ? 'Male' : 'Female';
        const firstName = gender === 'Male'
            ? malaysianFirstNames.male[Math.floor(Math.random() * malaysianFirstNames.male.length)]
            : malaysianFirstNames.female[Math.floor(Math.random() * malaysianFirstNames.female.length)];
        const lastName = malaysianFirstNames.lastNames[Math.floor(Math.random() * malaysianFirstNames.lastNames.length)];
        const specialty = specialties[Math.floor(Math.random() * specialties.length)];
        const service = services[Math.floor(Math.random() * services.length)];
        const city = malaysianCities[Math.floor(Math.random() * malaysianCities.length)];
        doctors.push({
            firstName: `Dr. ${firstName}`,
            lastName: lastName,
            gender: gender,
            age: Math.floor(Math.random() * 30) + 30,
            email: `dr.${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@malaysia.my`,
            phone: `+60${Math.floor(Math.random() * 90000000) + 10000000}`,
            medicalCode: `MY${specialty.code}${String(i).padStart(4, '0')}`,
            specialityId: specialty.id,
            serviceId: service.id,
            profileImg: `doctor${Math.floor(Math.random() * 5) + 1}.jpg`,
            city: city.name,
            state: city.state,
            specialtyName: specialty.name,
            serviceName: service.name,
        });
    }
    return doctors;
}
async function main() {
    console.log('🚀 Starting fresh doctor seed process...');
    try {
        const existingDoctors = await prisma.doctor.count();
        if (existingDoctors > 0) {
            console.log(`⚠️  Database already has ${existingDoctors} doctors. Creating additional doctors...`);
        }
        const patient1 = await prisma.patient.upsert({
            where: { email: 'malaysia.patient1@example.com' },
            update: {},
            create: {
                email: 'malaysia.patient1@example.com',
                firstName: 'Ahmad',
                lastName: 'Yusof',
                phone: '+60123456789',
                isVerified: true,
            },
        });
        const patient2 = await prisma.patient.upsert({
            where: { email: 'malaysia.patient2@example.com' },
            update: {},
            create: {
                email: 'malaysia.patient2@example.com',
                firstName: 'Siti',
                lastName: 'Rahman',
                phone: '+60123456790',
                isVerified: true,
            },
        });
        const hashedPassword = await bcrypt.hash('password123', 10);
        const clinic = await prisma.clinic.upsert({
            where: { email: 'klgh.malaysia@medical.my' },
            update: {},
            create: {
                name: 'Kuala Lumpur General Hospital',
                email: 'klgh.malaysia@medical.my',
                password: hashedPassword,
                phone: '+60312345678',
                address: 'Jalan Pahang, 53000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
                description: 'Leading government hospital in Kuala Lumpur providing comprehensive healthcare services',
                isVerified: true,
            },
        });
        const clinic2 = await prisma.clinic.upsert({
            where: { email: 'penangmc.malaysia@medical.my' },
            update: {},
            create: {
                name: 'Penang Medical Center',
                email: 'penangmc.malaysia@medical.my',
                password: hashedPassword,
                phone: '+6049876543',
                address: 'Jalan Macalister, 10450 George Town, Penang',
                description: 'Private medical center specializing in various medical specialties',
                isVerified: true,
            },
        });
        const malaysianDoctors = generateMalaysianDoctors(100);
        console.log('Creating 100 Malaysian doctors...');
        let doctorsCreated = 0;
        for (const doctorData of malaysianDoctors) {
            try {
                const doctor = await prisma.doctor.create({
                    data: {
                        firstName: doctorData.firstName,
                        lastName: doctorData.lastName,
                        gender: doctorData.gender,
                        age: doctorData.age,
                        email: doctorData.email,
                        password: hashedPassword,
                        phone: doctorData.phone,
                        medicalCode: doctorData.medicalCode,
                        specialityId: doctorData.specialityId,
                        serviceId: doctorData.serviceId,
                        profileImg: doctorData.profileImg,
                    },
                });
                await prisma.address.create({
                    data: {
                        addressLine1: `${Math.floor(Math.random() * 100) + 1} Jalan ${doctorData.lastName}`,
                        addressLine2: `Medical Center ${Math.floor(Math.random() * 5) + 1}`,
                        cityId: Math.floor(Math.random() * 100) + 1,
                        zipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
                        country: 'Malaysia',
                        latitude: Math.random() * 4 + 1 + '',
                        longitude: Math.random() * 4 + 100 + '',
                        isPrimary: true,
                        doctorId: doctor.id,
                    },
                });
                await prisma.clinicDoctor.create({
                    data: {
                        clinicId: Math.random() > 0.5 ? clinic.id : clinic2.id,
                        doctorId: doctor.id,
                    },
                });
                doctorsCreated++;
            }
            catch (error) {
                if (error.code === 'P2002') {
                    console.log(`⚠️  Skipping duplicate doctor: ${doctorData.email}`);
                }
                else {
                    throw error;
                }
            }
        }
        console.log('🎉 Seed process completed successfully!');
        console.log('- Patients:', patient1.email, patient2.email);
        console.log('- Clinics:', clinic.email, clinic2.email);
        console.log(`- ${doctorsCreated} Malaysian doctors created`);
        console.log('- Specialties:', specialties.map((s) => s.name).join(', '));
        console.log('- Services:', services.map((s) => s.name).join(', '));
        console.log('\n📋 Search Examples:');
        console.log('- GET /doctors?name=Ahmad&specialty=Cardiology&city=Kuala Lumpur');
        console.log('- GET /doctors?gender=Female&specialityId=5');
        console.log('- GET /doctors?medicalCode=MYCARD');
    }
    catch (error) {
        console.error('❌ Seed process failed:', error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
if (require.main === module) {
    main()
        .catch(console.error)
        .finally(() => process.exit(0));
}
//# sourceMappingURL=seed-doctors-fresh.js.map