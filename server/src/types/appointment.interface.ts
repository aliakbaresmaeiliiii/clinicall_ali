export interface IAppointment {
  id: number;
  patient_id: number;
  doctor_schedule_id: number;
  clinic_id: number;
  appointment_date: string;
  appointment_time: string;
  completed_time: string;
  arrival_time: string;
  status: AppointmentStatus;
  note: string;
}

export enum AppointmentStatus {
  Scheduled = "Scheduled",
  Completed = "Completed",
  Cancelled = "Cancelled",
}
export interface campaignDate {}
export interface campaignTime {
  start_time: string;
  end_time: string;
}
