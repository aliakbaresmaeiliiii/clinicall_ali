export interface PatientDTO {
<<<<<<< HEAD
  patient_id : number;
=======
  id: number;
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  first_name: string;
  last_name: string;
  phone: string;
  patientName: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
<<<<<<< HEAD
  date_of_birth: string;
=======
  dateOfBirth: string;
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  age: number;
  email: string;
  password: Password;
  token_verify: string;
  verify_code: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  address: string;
<<<<<<< HEAD
  blood_group: string;
  blood_pressure?: string;
  sugarLevel?: string;
  injury_condition?: string;
=======
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  bloodPressure?: string;
  sugarLevel?: string;
  injury?: string;
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
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
<<<<<<< HEAD

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
=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
