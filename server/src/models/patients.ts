export interface PatientDTO {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  patientName: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  dateOfBirth: string;
  age: number;
  email: string;
  password: Password;
  token_verify: string;
  verify_code: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  address: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  bloodPressure?: string;
  sugarLevel?: string;
  injury?: string;
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
