import { likeDTO } from '../../../ui/shared-ui/models/like';

export interface DoctorsDTO {
  position?: number | any;
  id?: any;
  name: string;
  contact_info?: string | undefined | null;
  specialty_name?: string | null | undefined;
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
  is_liked: boolean;
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
  comment:string
}

export interface DoctorScheduleAvailability {
  availableDate: string;
  availableTime: string[];
  consultationType: string;
  id: number;
  scheduleID: number;
  weekday: string;
  formattedDate: string;
}

export interface DoctorScheduleTimeAvailability {
  timeID: number;
  scheduleID: number;
  availableTime: string;
  isBooked: any;
  formattedTime: string;
}

export enum BookingStatus {
  Booked = 1,
  Available = 0,
}
