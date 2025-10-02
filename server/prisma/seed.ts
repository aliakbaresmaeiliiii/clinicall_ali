import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Malaysian cities and states
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

// Medical specialties with Malaysian context
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

// Medical services
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

// Common Malaysian names
const malaysianFirstNames = {
  male: [
    'Ahmad', 'Mohammad', 'Muhammad', 'Abdul', 'Ali', 'Hassan', 'Ibrahim', 'Ismail', 
    'Kamal', 'Rahman', 'Zainal', 'Farid', 'Hafiz', 'Rizal', 'Syed', 'Wan', 'Azman',
    'Firdaus', 'Hakim', 'Johan', 'Khalid', 'Luqman', 'Nazri', 'Osman', 'Rashid'
  ],
  female: [
    'Aishah', 'Fatimah', 'Zainab', 'Nurul', 'Siti', 'Mariam', 'Rohani', 'Salma',
    'Yasmin', 'Zahra', 'Amina', 'Farah', 'Hana', 'Intan', 'Jasmine', 'Khadijah',
    'Laila', 'Maimunah', 'Nor', 'Rahmah', 'Sofia', 'Tengku', 'Umi', 'Wan'
  ],
  lastNames: [
    'Abdullah', 'Ali', 'Hassan', 'Ibrahim', 'Ismail', 'Mohammad', 'Rahman',
    'Salleh', 'Yusof', 'Zainal', 'Ahmad', 'Bakar', 'Chin', 'Kumar', 'Lee', 'Lim',
    'Ng', 'Tan', 'Wong', 'Goh', 'Teh', 'Ong', 'Chan', 'Cheah'
  ]
};

// Generate random Malaysian doctor data
function generateMalaysianDoctors(count: number) {
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
      age: Math.floor(Math.random() * 30) + 30, // 30-60 years old
      email: `dr.${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@medical.my`,
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
  console.log('Starting database seed...');

  // Create sample patients
  const patient1 = await prisma.patient.create({
    data: {
      email: 'patient1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      isVerified: true,
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      email: 'patient2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+1234567891',
      isVerified: true,
    },
  });

  // Create sample clinic
  const hashedPassword = await bcrypt.hash('password123', 10);
  const clinic = await prisma.clinic.create({
    data: {
      name: 'Kuala Lumpur General Hospital',
      email: 'klgh@medical.my',
      password: hashedPassword,
      phone: '+60312345678',
      address: 'Jalan Pahang, 53000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
      description: 'Leading government hospital in Kuala Lumpur providing comprehensive healthcare services',
      isVerified: true,
    },
  });

  const clinic2 = await prisma.clinic.create({
    data: {
      name: 'Penang Medical Center',
      email: 'penangmc@medical.my',
      password: hashedPassword,
      phone: '+6049876543',
      address: 'Jalan Macalister, 10450 George Town, Penang',
      description: 'Private medical center specializing in various medical specialties',
      isVerified: true,
    },
  });

  // Generate 100 Malaysian doctors
  const malaysianDoctors = generateMalaysianDoctors(100);
  
  console.log('Creating 100 Malaysian doctors...');
  
  for (const doctorData of malaysianDoctors) {
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

    // Create address for doctor
    await prisma.address.create({
      data: {
        addressLine1: `${Math.floor(Math.random() * 100) + 1} Jalan ${doctorData.lastName}`,
        addressLine2: `Medical Center ${Math.floor(Math.random() * 5) + 1}`,
        cityId: Math.floor(Math.random() * 100) + 1, // Using random city ID
        zipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
        country: 'Malaysia',
        latitude: (Math.random() * 4) + 1 + '', // Rough Malaysia coordinates
        longitude: (Math.random() * 4) + 100 + '',
        isPrimary: true,
        doctorId: doctor.id,
      },
    });

    // Associate doctor with clinic
    await prisma.clinicDoctor.create({
      data: {
        clinicId: Math.random() > 0.5 ? clinic.id : clinic2.id,
        doctorId: doctor.id,
      },
    });
  }

  console.log('Sample data created:');
  console.log('- Patients:', patient1.email, patient2.email);
  console.log('- Clinics:', clinic.email, clinic2.email);
  console.log(`- ${malaysianDoctors.length} Malaysian doctors created`);
  console.log('- Specialties:', specialties.map(s => s.name).join(', '));
  console.log('- Services:', services.map(s => s.name).join(', '));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
