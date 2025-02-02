import {
  deleteAppointment,
  getAppointment,
  updateAppointment,
} from "../../bin/db";
import { IAppointment } from "../../types/appointment.interface";
import { saveAppointment } from "./db";
const moment = require("moment");

export class CalendarService {
  public static async insertEvent(eventData: IAppointment) {

    const receivedStartDate = new Date(eventData.start_date);
    const receivedEndDate = new Date(eventData.end_date);
    const receivedAppointmentDate = new Date(eventData.appointmentDate);
    const startLocalDate = moment(receivedStartDate)
      .local()
      .format("YYYY-MM-DD");
    const endLocalDate = moment(receivedEndDate).local().format("YYYY-MM-DD");
    
    const appointmentLocalDate = moment(receivedAppointmentDate).local().format("YYYY-MM-DD");


    const payload: any = {
      appointmentDate: appointmentLocalDate,
      start_date: startLocalDate,
      end_date: endLocalDate,
      campaignTime: eventData.campaignTime,
      date: eventData.date,
      id: eventData.id,
      event_description: eventData.event_description,
      event_title: eventData.event_title,
      priority: eventData.priority,
    };

    const data = await saveAppointment(payload);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

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
