# Clinic Support Center - NestJS API

This is a NestJS-based API server for a clinic support center application, migrated from Express.js and using Prisma as the ORM.

## Features

- **NestJS Framework**: Modern, scalable Node.js framework
- **Prisma ORM**: Type-safe database access
- **JWT Authentication**: Secure authentication system
- **Swagger Documentation**: API documentation at `/api-docs`
- **Elasticsearch Integration**: Search functionality
- **MySQL Database**: Primary database
- **TypeScript**: Full TypeScript support

## Prerequisites

- Node.js (v18 or higher)
- MySQL database
- Elasticsearch (optional)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="mysql://username:password@localhost:3306/clinic_db"

# JWT Configuration
JWT_SECRET_ACCESS_TOKEN="your-secret-access-token-key"
JWT_SECRET_REFRESH_TOKEN="your-secret-refresh-token-key"
JWT_ACCESS_TOKEN_EXPIRED="15m"
JWT_REFRESH_TOKEN_EXPIRED="7d"

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:4200"

# Elasticsearch Configuration
ELASTICSEARCH_NODE="http://localhost:9200"
ELASTICSEARCH_USERNAME="elastic"
ELASTICSEARCH_PASSWORD="your-password"
```

3. Generate Prisma client:
```bash
npm run prisma:generate
```

4. Run database migrations:
```bash
npm run prisma:migrate
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## API Documentation

Once the server is running, you can access the Swagger API documentation at:
- http://localhost:8000/api-docs

## Available Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Project Structure

```
src/
├── auth/                 # Authentication module
├── admin/               # Admin management
├── doctor/              # Doctor management
├── patient/             # Patient management
├── clinic/              # Clinic management
├── appointment/         # Appointment management
├── review/              # Review management
├── elasticsearch/       # Elasticsearch integration
├── ai/                  # AI services
├── cities/              # Cities management
├── countries/           # Countries management
├── diseases/            # Diseases management
├── insurance/           # Insurance management
├── medications/         # Medications management
├── nav-items/           # Navigation items
├── prescription-medicine/ # Prescription medicine
├── refresh-token/        # Refresh token management
├── user/                # User management
├── prisma/              # Prisma configuration
├── app.module.ts        # Main application module
└── main.ts              # Application entry point
```

## Database Schema

The application uses Prisma with MySQL. The schema includes:

- **Users**: Admin, Doctor, Patient, Clinic
- **Appointments**: Doctor-patient appointments
- **Reviews**: Patient reviews for doctors
- **Medical Records**: Patient medical history
- **Addresses**: Doctor clinic addresses
- **Refresh Tokens**: JWT refresh token management

## Authentication

The API uses JWT-based authentication with the following endpoints:

- `POST /auth/clinic/register` - Register a new clinic
- `POST /auth/patient/register` - Register a new patient
- `POST /auth/clinic-sign-in` - Sign in as clinic
- `POST /auth/doctor-sign-in` - Sign in as doctor
- `POST /auth/patient-sign-in` - Sign in as patient
- `POST /auth/verify-clinic-email` - Verify clinic email
- `POST /auth/verify-patient-email` - Verify patient email

## Migration Notes

This application has been migrated from Express.js to NestJS with the following changes:

1. **Framework**: Express.js → NestJS
2. **ORM**: Sequelize → Prisma
3. **Architecture**: MVC → Modular architecture with dependency injection
4. **Validation**: Custom validation → class-validator
5. **Documentation**: Manual → Swagger/OpenAPI
6. **Authentication**: Custom JWT → NestJS JWT with Passport strategies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the ISC License.


