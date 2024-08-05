export interface IResponse<T> {
    code: number;
    message: string;
    data?: T;
}

export interface IResponseError {
    code: number;
    message: string;
    error: any;
}

export interface IResponsePaginated<T> {
    code: number;
    message: string;
    data: T[];
    meta: IResponsePaginateMeta
}

export interface IResponsePaginateMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}
