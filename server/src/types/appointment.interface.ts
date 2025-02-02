export interface IAppointment {
  id: number;
  id: number;
  event_id?: number;
  event_start?: string;
  event_end?: string;
  location?: string;
  organizer?: string;
  attendess?: string;
  reminder_minutes_before?: string;
  create_at?: string;
  date: string;
  priority: string;
  appointmentDate: string;
  event_description: string;
  campaignTime: campaignTime;
  start_date: string;
  end_date: string;
  event_title: string;
}

export interface campaignDate {

}
export interface campaignTime {
  start_time: string;
  end_time: string;
}
