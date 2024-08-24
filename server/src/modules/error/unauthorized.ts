import {BaseResponse} from "./base_response"

export class Unauthorized extends BaseResponse {
    constructor(message: string) {
        super(message, 401);
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }
}
