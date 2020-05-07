export interface BaseResponse<T> {
    code: number;
    data: T;
    success: boolean;
    message: string;
}