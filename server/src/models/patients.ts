export interface PatientDTO {
  patient_id : number;
  first_name: string;
  last_name: string;
  phone: string;
  patientName: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  date_of_birth: string;
  age: number;
  email: string;
  password: Password;
  token_verify: string;
  verify_code: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  address: string;
  blood_group: string;
  blood_pressure?: string;
  sugarLevel?: string;
  injury_condition?: string;
  profileImage?: string;
  heartBeat: string;
  haemoglobin: string;
  doctor: string;
  treatment: string;
  charges: string;
  description: string;
}
interface Password {
  confirmPassword: string;
  password: string;
}

export interface patientMedicalRecordsDTO {
  id?: number;
  patient_id: number;
  blood_group: string;
  blood_pressure: string;
  heart_beat: string;
  sugar_level: string;
  injury_condition: string;
  haemoglobin: string;
  treatment: string;
  charges: string;
  description?: string;
  created_at?: Date;
}
