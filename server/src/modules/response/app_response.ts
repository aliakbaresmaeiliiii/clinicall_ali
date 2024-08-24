import { AppResponse } from "../../types/response.interface";

type DataResponse =
  | {
      message: string;
      code?: number;
    }
  | any;

class BuildResponse {
  private static baseResponse(dataResponse: DataResponse) {
    const {
      message = "data has been received!",
      code = 200,
      ...rest
    } = dataResponse;
    return {
      code,
      message,
      ...rest,
    };
  }

  /**
   * Response Success
   */

  public static get(dataResponse: DataResponse) {
    return this.baseResponse(dataResponse);
  }

  /**
   * Response Create
   */
  public static created(dataResponse: DataResponse) {
    return this.baseResponse({
      codde: 201,
      message: "data has beed added",
      ...dataResponse,
    });
  }

  /**
   * Response Update
   */

  public static updated(dataResponse: DataResponse) {
    return this.baseResponse({
      message: "the data has beed updated",
      ...dataResponse,
    });
  }

  /**
   * Response Delete
   */
  public static deleted(dataResponse: DataResponse) {
    return this.baseResponse({
      message: "data has been deleted",
      ...dataResponse,
    });
  }

  public static appResponse(data: any) {
    return {
      code: data.code ? data.code : 200,
      message: data.message ? data.message : "",
      status: data.status ? data.status : 0,
      showToUser: data.showToUser ? data.showToUser : false,
      messageCode: data.messageCode ? data.messageCode : "",
      messageKind: data.messageKind ? data.messageKind : null,
      isSuccessfull: data.isSuccessfull ? data.isSuccessfull : false,
      data: data.data ? data.data : null,
    } as AppResponse;
  }
}

export default BuildResponse;
