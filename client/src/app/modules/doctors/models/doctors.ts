import { likeDTO } from '../../../ui/shared-ui/models/like';

export interface DoctorsDTO {
  position?: number | any;
  id?: any;
  doctor_id?: any;
<<<<<<< HEAD
  first_name: string;
  last_name: string;
  addresses: doctorAddressesDTO;
=======
  name: string;
  addresses: IDoctorAddresses[];
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
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
<<<<<<< HEAD
  gender?: "male" | "female";
=======
  gender?: string | null | undefined;
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  location?: string | null | undefined;
  average_rating: number;
  medical_code: string;
  description: string;
  click_count: number;
  user_suggestion_percentage: number;
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

<<<<<<< HEAD
export interface doctorAddressesDTO {
=======
export interface IDoctorAddresses {
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
  address_line1: string;
  address_line2: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
  state: string;
  zipcode: string;
}
<<<<<<< HEAD

=======
>>>>>>> 0ea4f870e175dddffe86ebd4de99f9738212b6d4
