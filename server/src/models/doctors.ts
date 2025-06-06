export interface DoctorsDTO {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  age: number;
  reviews_id: number;
  email: string;
  password: Password;
  token_verify: string;
  verify_code: string;
  phone: string;
  service_id: number;
  visit_history_id: number;
  profile_img: string;
  medical_code: string;
  click_count: number;
  is_liked: boolean;
  average_rating: string;
  total_ratings: string;
  speciality_id: number;
}

interface Password {
  confirmPassword: string;
  password: string;
}

export interface likeDTO {
  doctor_id: number;
  patient_id: string;
  isLike: boolean;
}

export interface CommentsDTO {
  id: number;
  comment_text: string;
  rating: any;
}

export interface ReviewsDTO {
  doctor_id: number;
  user_id: number;
  rating: number;
  comment: string;
  recommendations?: string;
  ratings: Ratings;
}

interface Ratings {
  professional_demeanor: number;
  sufficient_time: number;
  skill: number;
  staff_behavior: number;
  clinic_condition: number;
}

export interface SubSpecialty {
  specialty_id: number;
  specialty_name: string;
  specialty_image: string;
  sub_specialty_id: number | null; // Nullable in case no sub-specialties exist
  sub_specialty_name: string | null;
  sub_specialty_image: string | null;
}
