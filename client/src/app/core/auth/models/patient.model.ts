export interface Patient {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth?: string;
  gender?: string;
  role: 'patient';
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PatientRegistrationRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth?: string;
  gender?: string;
}

export interface PatientLoginRequest {
  email: string;
}

export interface PatientVerificationRequest {
  email: string;
  verifyCode: string;
}

export interface PatientResponse {
  statusCode: number;
  message: string;
  data?: Patient;
  token?: string;
}

export interface PatientVerificationResponse {
  statusCode: number;
  message: string;
  data?: {
    patient: Patient;
    token: string;
  };
}
