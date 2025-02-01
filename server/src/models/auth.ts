export interface ConfirmEmail {
  email: string;
  id?: string;
  verify_code: string;
}

export interface ILogin {
  email: string;
  password: string;
  role: string;
}
