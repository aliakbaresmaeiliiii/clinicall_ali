export interface UserInfo {
  id: number;
  patientName: string;
  age: number;
  sex: string;
  phone: any;
  external_id?: number;
  first_name?: any;
  last_name?: any;
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
  id: number;
  text: string;
  rating: any;
}
