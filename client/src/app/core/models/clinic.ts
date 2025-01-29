export interface IClinic {
    id?: number;
    name?: string | null;
    owner_name?: string | null;
    email?: string | null;
    password?: string | null;
    confirmPassword?: string;
    phone?: string | null;
    city?: string | null;
    state?: string | null;
    zip_code?: number | null;
    country?: string | null;
    create_at?: Date;
  }
  