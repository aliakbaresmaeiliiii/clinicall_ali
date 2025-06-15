export interface PatientDTO {
  position?: any;
  patient_id?: string | null | any;
  patientName?: string | null | undefined;
  gender?: string | undefined | null;
  mobile?: any;
  dateOfBirth?: any;
  age?: string | undefined | null;
  email?: string | null | undefined;
  maritalStatus?: string | undefined | null;
  address?: string | undefined | null;
  bloodGroup?: any;
  bloodPressure?: any;
  heartBeat?: string | undefined | null;
  haemoglobin?: any;
  doctor?: string | undefined | null;
  treatment?: string | undefined | null;
  charges?: string | undefined | null;
  description?: any;
  sugarLevel?: any;
  injury?: string | undefined | null;
  profile_img?: string | undefined | any;
  profileImageShow?: string;
  diseases?: any;
  diseaseSubcategories?: any;
  severity?: any;
  blood_group?: string | null;
  blood_pressure?: number | null;
  heart_beat?: number | null;
  sugar_level?: string | null;
  injury_condition?: string | null;
  date_of_birth?: string;
  first_name?: string;
  last_name?: string;
  national_code?: string;
  phone?: string;
  user_name?: string;
}

export interface PatientMedicalRecord {}
