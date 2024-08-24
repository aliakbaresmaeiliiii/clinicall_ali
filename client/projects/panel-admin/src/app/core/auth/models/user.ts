export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  emailConfirmed?: boolean;
  signupStatus?: number;
  verify_code?: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipcode: string;
  skills: Skills;
}
``;
export interface Skills {
  skill_id: number;
  skill_name: string;
}

export interface Register {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  gender: string;
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
