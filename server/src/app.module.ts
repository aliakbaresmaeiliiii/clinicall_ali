import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { ClinicModule } from './clinic/clinic.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ReviewModule } from './review/review.module';
// import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';
import { AiModule } from './ai/ai.module';
import { CitiesModule } from './cities/cities.module';
import { CountriesModule } from './countries/countries.module';
import { DiseasesModule } from './diseases/diseases.module';
import { InsuranceModule } from './insurance/insurance.module';
import { MedicationsModule } from './medications/medications.module';
import { NavItemsModule } from './nav-items/nav-items.module';
import { PrescriptionMedicineModule } from './prescription-medicine/prescription-medicine.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { UserModule } from './user/user.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PrismaModule,
    AuthModule,
    AdminModule,
    DoctorModule,
    PatientModule,
    ClinicModule,
    AppointmentModule,
    ReviewModule,
    // ElasticsearchModule,
    AiModule,
    CitiesModule,
    CountriesModule,
    DiseasesModule,
    InsuranceModule,
    MedicationsModule,
    NavItemsModule,
    PrescriptionMedicineModule,
    RefreshTokenModule,
    UserModule,
    SearchModule,
  ],
})
export class AppModule {}
