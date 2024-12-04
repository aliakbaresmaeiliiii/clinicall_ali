export interface ICalendar {
  event_id?: number;
  event_title: string;
  event_description: string;
  event_start?: string;
  event_end?: string;
  location?: string;
  organizer?: string;
  attendess?: string;
  reminder_minutes_before?: string;
  create_at?: string;
  appointment_date: string;
  dataList?: IDataList;
  priority:number;
}

export interface IDataList {
  color: string;
  event_description: string;
  event_title: string;
  date:Date;
  isPastDate:boolean;
  isToday:boolean;
  
  
}


