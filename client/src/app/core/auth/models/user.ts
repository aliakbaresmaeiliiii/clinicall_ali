export interface User {
  id?: number;
  patientName: string;
  email: string;
  password?: string;
  emailConfirmed?: boolean;
  signupStatus?: number;
  dateOfBirth?: number;
  verify_code?: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  skills: Skills;
  role:string

}
export interface Skills {
  skill_id: number;
  skill_name: string;
}

export interface Register {
  patientName: string;
  nickName: string;
  email: string;
<<<<<<< HEAD
  gender?: "male" | "female";
=======
  gender: string;
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  birthDay: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  code: number;
  message: string;
  user?: User;
  tokenVerify?: string;
  newUser:User
}
export interface CurrentUser extends SignupResponse {
  id: number;
  email: string;
}

export interface ConfirmEmail {
  email: string;
  id: string;
  verify_code: string;
}
export interface TokenPermission {
  tokenKey: string;
  modify: boolean;
  view: boolean;
  isSingle?: boolean;
}
