export interface PatientDTO {
  id: number;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  mobile: string;
  dateOfBirth: string;
  age: number;
  email: string;
  maritalStatus: "Single" | "Married" | "Divorced" | "Widowed";
  address: string;
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  bloodPressure?: string;
  sugarLevel?: string;
  injury?: string;
  profileImage?: string;
  heartBeat: string;
  haemoglobin: string;
  doctor: string;
  treatment: string;
  charges: string;
  description: string;
}
