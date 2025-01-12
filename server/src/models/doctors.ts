export interface DoctorsDTO {
  doctor_id: number;
  name?: string | null | undefined;
  contact_info?: string | undefined | null;
  email?: string | null | undefined;
  profileImage?: string | undefined | any;
  department?: string | undefined | any;
  specialty_name?: string | undefined | any;
  degree?: string | undefined | any;
  address?: string | undefined | any;
  joingin_date?: Date;
  gender?: string;
  dateOfBirth?: string;
  age?: string;
  lat?: number;
  lng?: number;
  medical_code?: string;
  description?: string;
  click_count?: number;
}

export interface likeDTO {
  user_id: number;
  doctor_id: number;
  entity_type: string;
}

export interface CommentsDTO {
  id: number;
  user_id: number;
  doctor_id: number;
  comment_text: string;
  rating: any;
}

export interface ReviewsDTO {
  doctor_id: number;
  user_id: number;
  rating: number;
  comment: string;
  recommendation?: string;
  ratings: Ratings;
}

interface Ratings {
  professional_demeanor: number;
  sufficient_time: number;
  skill: number;
  staff_behavior: number;
  clinic_condition: number;
}
