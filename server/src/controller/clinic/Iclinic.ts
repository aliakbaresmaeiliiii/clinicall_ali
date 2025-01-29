export interface IClinic {
  id: number;
  name: string;
  owner_name: string;
  email: string;
  token_verify?: string;
  verify_code?: string;
  password: Password;
  phone: string;
  city: string;
  state: string;
  zip_code: number;
  country: string;
  create_at?: Date;
}
interface Password {
  confirmPassword: string;
  password: string;
}
