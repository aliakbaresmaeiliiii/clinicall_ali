export interface UserInfo {
  user_id: number;
  patientName: string;
  age: number;
  sex: string;
  phoneNumber: any;
  id: number;
  external_id?: number;
  firstName?: any;
  lastName?: any;
  national_code?: any;
  surname?: string;
  middle_name?: string;
  gender?: any;
  birthday: string;
  address?: string;
  activation_date: string;
  activated?: number;
  email?: string | undefined | any;
  zipcode?: string;
  city?: any;
  street?: string;
  suite?: string;
  comments: CommentsDTO[];
}

export interface UserRole {
  roleName: string;
  branchName: string;
  schoolName: string;
  assignmentDate: Date;
  updateDate: Date;
}

export interface CommentsDTO {
  user_id: number;
  doctor_id: number;
  text: string;
  rating: any;
}
