import { RowDataPacket } from "mysql2";
import { IAppointment } from "../../types/appointment.interface";
import { coreSchema, query } from "../../bin/mysql";

// export async function saveAppointment(eventData: IAppointment) {
//   const insertEvent = await query<RowDataPacket[]>(
//     `INSERT INTO ${coreSchema}.appointments
//       (id, patient_id, doctor_schedule_id, clinic_id, appointment_date, appointment_time, completed_time, arrival_time, status, note, created_at, updated_at)
//      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//     [
//       eventData.id,
//       eventData.patient_id,
//       eventData.doctor_schedule_id,
//       eventData.clinic_id,
//       eventData.appointment_date,
//       eventData.appointment_time,
//       eventData.completed_time,
//       eventData.arrival_time,
//       eventData.status,
//       eventData.note,
//       new Date(),
//       new Date(),
//     ]
//   );

//   return insertEvent;
// }

export async function getAppointment(searchValue?: string) {
  const value = [];
  const result = await query<RowDataPacket[]>(
    `SELECT a.*, d.first_name AS first_name,
    d.last_name AS last_name
    FROM ${coreSchema}.appointments a
    LEFT JOIN 
     ${coreSchema}.doctors d
     ON a.doctor_schedule_id = d.id
    `
  );
  return result;
}
