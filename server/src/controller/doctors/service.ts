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
  checkDoctorPhoneNumberExists,
  doctorDetail,
  existingFeedback,
  filterSpeciality,
  getDoctors,
  getMostPopularDoctors,
  getSpecialties,
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

  public static async logDoctorClick(doctor_id: number) {
    const data = await logDoctorClick(doctor_id);
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
  public static async filterSpeciality(value: string) {
    const data = await filterSpeciality(value);
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
}
