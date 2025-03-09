import {
  CommentsDTO,
  DoctorsDTO,
  likeDTO,
  ReviewsDTO,
} from "../../models/doctors";
import { ResponseError } from "../../modules/error/response_error";
import {
  addComment,
  addDoctor,
  booked,
  checkDoctorPhoneNumberExists,
  doctorSchadules,
  doctorScheduleTimeAvailability,
  existingFeedback,
  filterServicesById,
  filterSpecialtyById,
  getDoctoLike,
  getDoctors,
  getReviews,
  getServices,
  getSpecialties,
  getSubSpecialtiesById,
  insertReviews,
  like,
  recordDoctorProfileView,
  updateDoctor,
} from "./db";
const moment = require("moment");

export class DoctorsService {
  public static async getDoctors(filters: {
    name?: string;
    id?: string;
    city_id?: string;
    doctor_id?: string;
    minRating?: number;
    maxRating?: number;
    isPopular?: boolean;
  }) {
    const data = await getDoctors(filters);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  // public static async getMostPopularDoctors() {
  //   const data = await getMostPopularDoctors();
  //   if (data) {
  //     return { message: "ok", data };
  //   } else {
  //     return null;
  //   }
  // }
  public static async checkDoctorPhoneNumberExists(
    mobile: string
  ): Promise<boolean> {
    const data = await checkDoctorPhoneNumberExists(mobile);
    if (data) {
      return true;
    } else {
      return false;
    }
  }
  public static async registerDoctor(formData: DoctorsDTO) {
    const data = await addDoctor(formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  // public static async doctorDetial(doctortId: number) {
  //   const data = await doctorDetail(doctortId);
  //   if (data) {
  //     return { message: "ok", data };
  //   } else {
  //     return null;
  //   }
  // }
  public static async updateDoctor(formData: DoctorsDTO) {
    const data = await updateDoctor(formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async recordDoctorProfileView(id: number) {
    const data = await recordDoctorProfileView(id);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async addComment(comment: CommentsDTO) {
    const data = await addComment(comment);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async getSpecialties() {
    const data = await getSpecialties();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async getSubSpecialtiesById(specialtyId: number) {
    const data = await getSubSpecialtiesById(specialtyId);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async filterSpecialtyById(specialtyId: number) {
    const data = await filterSpecialtyById(specialtyId);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async filterServicesById(serviceId: number) {
    const data = await filterServicesById(serviceId);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async insertReviews(reviewData: ReviewsDTO) {
    const checkExistingFeedback = await existingFeedback(reviewData);
    if (checkExistingFeedback.length > 0) {
      throw new ResponseError.BadRequest(
        "You have already submitted feedback for this doctor."
      );
    } else {
      const data = await insertReviews(reviewData);
      return { message: "ok", data };
    }
  }

  public static async getReviews() {
    const data = await getReviews();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async doctorSchadules(
    doctor_id: number,
    consultation_types: any
  ) {
    const data = await doctorSchadules(doctor_id, consultation_types);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async doctorScheduleTimeAvailability(schedule_id: number) {
    const data = await doctorScheduleTimeAvailability(schedule_id);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async booked(
    doctor_schedule_id: number,
    patient_id: number,
    clinic_id: number,
    appointment_date: string,
    appointment_time: string
  ) {
    appointment_date = moment(appointment_date).format("YYYY-MM-DD");
    const data = await booked(
      doctor_schedule_id,
      patient_id,
      clinic_id,
      appointment_date,
      appointment_time
    );
    return data ? { message: "ok", data } : null;
  }

  public static async fetchServices() {
    const data = await getServices();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async toggleLike(likeInfo: likeDTO) {
    const data = await like(likeInfo);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async getDcotorLike(patient_id: number) {
    const data = await getDoctoLike(patient_id);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
