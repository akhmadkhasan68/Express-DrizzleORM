export interface IRequestPagination {
    page: number;
    limit: number;
    sort?: string;
    order?: string;
    keyword?: string;
}
