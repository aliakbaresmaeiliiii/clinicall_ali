export class BaseResponse extends Error {
    public statusCode: number;

    constructor(message: string, starusCode = 500) {
        super(message)
        this.message = message;
        this.statusCode = starusCode;
        Object.setPrototypeOf(this, BaseResponse.prototype)
    }
}
