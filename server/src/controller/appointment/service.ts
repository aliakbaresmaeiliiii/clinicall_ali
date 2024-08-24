import {
  deleteAppointment,
  getAppointment,
  saveAppointment,
  updateAppointment,
} from "../../bin/db";
import { IAppointment } from "../../types/appointment.interface";

class CalendarService {
  public static async insertEvent(eventData: IAppointment) {
    const data = await saveAppointment(eventData);
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
export default CalendarService;
