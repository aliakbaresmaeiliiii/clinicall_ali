export interface DoctorsDTO {
  position?: number | any;
  doctor_id?: string | null | undefined;
  name: string;
  mobile?: string | undefined | null;
  specialization?: string | null | undefined;
  dateOfBirth?: string | undefined | any;
  address?: string | null;
  department?: string | undefined | any;
  degree?: string | undefined | any;
  email?: string | null | undefined;
  age?: string | undefined | null;
  profileImage?: string | undefined | any;
  joingin_date?: Date;
  gender?: string | null | undefined;
  location?: string | null | undefined;
  average_rating: number;
}

export interface LocaitonDTO {
  x: number;
  y: number;
}
