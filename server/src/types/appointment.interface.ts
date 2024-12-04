export interface IAppointment {
  patient_id: number;
  doctor_id: number;
  event_id?: number;
  event_start?: string;
  event_end?: string;
  location?: string;
  organizer?: string;
  attendess?: string;
  reminder_minutes_before?: string;
  create_at?: string;
  date: string;
  status: string;
  event_description: string;
  event_title: string;
}
