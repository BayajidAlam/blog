type IOptions = {
    page?: number | string;
    limit?: number | string;
    sortOrder?: string;
    sortBy?: string;
};
type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};
declare const paginationSortingHelper: (options: IOptions) => IOptionsResult;
export default paginationSortingHelper;
//# sourceMappingURL=paginationSortingHelper.d.ts.map