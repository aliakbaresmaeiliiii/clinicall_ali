export interface DoctorsDTO {
  id: number;
  name?: string | null | undefined;
  mobile?: string | undefined | null;
  email?: string | null | undefined;
  profileImage?: string | undefined | any;
  department?: string | undefined | any;
  specialization?: string | undefined | any;
  degree?: string | undefined | any;
  address?: string | undefined | any;
  joingin_date: Date;
  gender: string;
  dateOfBirth: string;
  age: string;
  lat: number;
  lng: number;
}
