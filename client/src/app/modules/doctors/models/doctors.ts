import { likeDTO } from '../../../ui/shared-ui/models/like';

export interface DoctorsDTO {
  position?: number | any;
  id?: any;
  doctor_id?: any;
  name: string;
  addresses: IDoctorAddresses[];
  phone?: string | undefined | null;
  specialty_name: string | null | undefined;
  dateOfBirth?: string | undefined | any;
  city?: string | null;
  department?: string | undefined | any;
  degree?: string | undefined | any;
  email?: string | null | undefined;
  age?: string | undefined | null;
  profile_img?: string | undefined | any;
  joingin_date?: Date;
  gender?: string | null | undefined;
  location?: string | null | undefined;
  average_rating: number;
  medical_code: string;
  description: string;
  click_count: number;
  likeInfo: likeDTO;
  isLiked: boolean;
}

export interface LocaitonDTO {
  x: number;
  y: number;
}

export interface ReviewsDTO {
  id: number;
  rating: number;
  recommendation?: string;
  professional_demeanor: number;
  sufficient_time: number;
  skill: number;
  staff_behavior: number;
  clinic_condition: number;
  comment: string;
}

export interface DoctorScheduleAvailability {
  availableTime: string[];
  avaliable_date: string;
  day_of_week: string;
  consultatio_types_available: string;
  id: number;
  doctor_id: number;
  schedule_id: number;
  weekday: string;
  formattedDate: string;
}

export interface DoctorScheduleTimeAvailability {
  timeID: number;
  id: number;
  time: string;
  is_booked: any;
  formattedTime: string;
}

export enum BookingStatus {
  is_booked = 1,
  is_available = 0,
}

export interface IDoctorAddresses {
  address_line1: string;
  address_line2: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  state: string;
  zipcode: string;
}
