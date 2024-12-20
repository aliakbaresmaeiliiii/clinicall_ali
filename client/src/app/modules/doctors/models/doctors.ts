import { likeDTO } from '../../../ui/shared-ui/models/like';

export interface DoctorsDTO {
  position?: number | any;
  doctor_id?: any;
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
  medical_code: string;
  description: string;
  click_count: number;
  likeInfo: likeDTO;
  is_liked:boolean
}

export interface LocaitonDTO {
  x: number;
  y: number;
}
