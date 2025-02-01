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
  id: number;
  entity_type: string;
}

export interface CommentsDTO {
  id: number;
  comment_text: string;
  rating: any;
}

export interface ReviewsDTO {
  id: number;
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
