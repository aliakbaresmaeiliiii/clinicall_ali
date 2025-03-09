import {
  deleteAppointment,
  updateAppointment,
} from "../../bin/db";
import { IAppointment } from "../../types/appointment.interface";
import { getAppointment } from "./db";
const moment = require("moment");

export class CalendarService {
  // public static async insertEvent(eventData: IAppointment) {
  //   // const appointment_date = new Date(eventData.appointment_date);
  //   // // const receivedEndDate = new Date(eventData.end_date);
  //   // // const receivedAppointmentDate = new Date(eventData.appointmentDate);
  //   // const startLocalDate = moment(appointment_date)
  //   //   .local()
  //   //   .format("YYYY-MM-DD");
  //   // const endLocalDate = moment(receivedEndDate).local().format("YYYY-MM-DD");

  //   // const appointmentLocalDate = moment(receivedAppointmentDate).local().format("YYYY-MM-DD");
  //   const appointment_date = moment(eventData.appointment_date).format(
  //     "YYYY-MM-DD"
  //   );

  //   const payload: IAppointment = {
  //     id: eventData.id,
  //     patient_id: eventData.patient_id,
  //     doctor_schedule_id: eventData.doctor_schedule_id,
  //     clinic_id: eventData.clinic_id,
  //     appointment_date: appointment_date,
  //     appointment_time: eventData.appointment_time,
  //     completed_time: eventData.completed_time,
  //     arrival_time: eventData.arrival_time,
  //     status: eventData.status,
  //     note: eventData.note,
  //   };
  //   const data = await saveAppointment(payload);

  //   return data ? { message: "ok", data } : null;
  // }

  public static async getEventData() {
    const data = await getAppointment();
    if (data) {
      return { message: "ok", data };
    }
  }

  public static async deleteAppointmentItem(id: string) {
    const data = await deleteAppointment(id);
    return data;
  }

  public static async updateAppointmentItem(dataAppintment: IAppointment) {
    const data = await updateAppointment(dataAppintment);
    data;
  }
}
