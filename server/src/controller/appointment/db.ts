import { RowDataPacket } from "mysql2";
import { IAppointment } from "../../types/appointment.interface";
import { coreSchema, query } from "../../bin/mysql";

export async function saveAppointment(eventData: IAppointment) {
  const insertEvent = await query<RowDataPacket[]>(
    `INSERT INTO ${coreSchema}.appointments 
        (patient_id, id,appointment_date, priority,event_title,created_at,updated_at,event_description,start_date,end_date,start_time,end_time)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    {
      values: [
        eventData.patient_id,
        eventData.id,
        eventData.appointmentDate,
        eventData.priority,
        eventData.event_title,
        new Date(),
        new Date(),
        eventData.event_description,
        eventData.start_date,
        eventData.end_date,
        eventData.campaignTime.start_time,
        eventData.campaignTime.end_time,
      ],
    }
  );

  return insertEvent;
}



