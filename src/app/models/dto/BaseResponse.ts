export class BaseResponse<T> {
    status: number|null;
    message: string|null;
    data: T|null;

    constructor(status: number|null, message: string|null, data: T|null) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}