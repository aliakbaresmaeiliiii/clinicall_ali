import { CommentsDTO } from "../models/doctors";

export interface User {
  user_id: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  national_code?: string;
  gender?: string;
  email: string;
  phoneNumber?: string;
  newPassword?: string;
  confirmPassword?: string;
  dateOfBirth?: string;
  password?: string | any;
  emailConfirmed?: number;
  signupStatus?: number;
  verify_code?: string;
  address?: string;
  isActive?: boolean | null | number;
  country?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  tokenVerify?: string | null;
  imgUser?: string;
  oldPassword?: string | any;
  comment?: CommentsDTO;
  roles: Role[];
  permissions: Permissions[];
}

export interface CreateUser {
  user_id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  password: string;
  confirmPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  language_Id?: number;
  tokenVerify?: string | null;
  verify_code: string;
}
export interface Register {
  patientName: string;
  lastName: string;
  nickName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface LoginAttributes {
  email: string;
  password: string;
}

export interface ConfirmEmail {
  email: string;
  user_id?: string;
  verify_code: string;
}

export interface Role {
  id: number;
  role_name?: string;
}

interface Permissions {
  id: number;
  permission_name?: string;
}
