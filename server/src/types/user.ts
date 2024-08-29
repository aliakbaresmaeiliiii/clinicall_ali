export interface User {
  user_id: string;
  userName?: string;
  lastName?: string;
  gender?: string;
  email: string;
  phoneNumber?: string;
  yearOfBirth?: string;
  password?: string | any;
  emailConfirmed?: number;
  signupStatus?: number;
  verify_code?: string;
  address?: string;
  isActive?: boolean | null | number
  country?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  tokenVerify?: string | null;
  imgUser?:string;
  role_name:string;
  permission_name:string;
}



export interface CreateUser {
  user_id: string;
  email: string;
  newPassword: string;
  confirmNewPassword: string;
  language_Id?: number;
  tokenVerify?: string | null;
  verify_code: string;
}
export interface Register {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  gender: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}


export interface LoginAttributes {
  email: string
  password: string
}


export interface ConfirmEmail {
  email: string;
  user_id?: string;
  verify_code: string;
}
