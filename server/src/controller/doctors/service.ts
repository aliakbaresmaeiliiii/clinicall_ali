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
  doctorDetail,
  doctorScheduleAvailability,
  doctorScheduleTimeAvailability,
  existingFeedback,
  filterServicesById,
  filterSpecialtyById,
  getDoctors,
  getMostPopularDoctors,
  getReviews,
  getSpecialties,
  getSubSpecialtiesById,
  insertReviews,
  like,
  logDoctorClick,
  updateDoctor,
} from "./db";

export class DoctorsService {
  public static async getDoctors() {
    const data = await getDoctors();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async getMostPopularDoctors() {
    const data = await getMostPopularDoctors();
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
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
  public static async doctorDetial(doctortId: number) {
    const data = await doctorDetail(doctortId);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async updateDoctor(formData: DoctorsDTO) {
    const data = await updateDoctor(formData);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async logDoctorClick(id: number) {
    const data = await logDoctorClick(id);
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
  public static async getSubSpecialtiesById(specialtyId:number) {
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

  public static async doctorScheduleAvailability(
    id: number,
    consultationType: any
  ) {
    const data = await doctorScheduleAvailability(id, consultationType);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
  public static async doctorScheduleTimeAvailability(scheduleID: number) {
    const data = await doctorScheduleTimeAvailability(scheduleID);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }

  public static async booked(timeID: number) {
    const data = await booked(timeID);
    if (data) {
      return { message: "ok", data };
    } else {
      return null;
    }
  }
}
