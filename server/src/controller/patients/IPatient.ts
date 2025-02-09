export interface IPatient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  user_name: string;
  googleId: string;
  email: string;
  password: Password;
  signupStatus: boolean;
  verify_code: string;
  createdAt: string;
  updatedAt: string;
  position: number;
  patientcol: string;
  nickName: string;
  phone: string;
  gender: string;
  token_verify: string;
  email_confirmed: number;
  patientcol1: string;
  address: string;
  patientcol2: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  isActive: boolean;
  profile_img: string;
  national_code: string;
  visit_history_id: number;
  created_at: string;
  updated_at: string;
}

interface Password {
    confirmPassword: string;
    password: string;
  }