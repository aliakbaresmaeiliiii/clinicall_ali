export interface UserInfo {
  user_id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  phoneNumber: string;
  id: number;
  external_id?: number;
  name?: string;
  surname?: string;
  middle_name?: string;
  gender?: string;
  birthday: string;
  address?: string;
  activation_date: string;
  activated?: number;
  email?: string;
  zipcode?: string;
  city?: string;
  street?: string;
  suite?: string;
}

export interface UserRole {
  roleName: string;
  branchName: string;
  schoolName: string;
  assignmentDate: Date;
  updateDate: Date;
}
