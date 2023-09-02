"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const calculatePagination = (option) => {
    const page = Number(option.page || 1);
    const size = Number(option.size || 10);
    const skip = (page - 1) * size;
    const minPrice = Number(option.minPrice);
    const maxPrice = Number(option.maxPrice);
    const sortBy = option.sortBy || 'createdAt';
    const sortOrder = option.sortOrder || 'desc';
    return {
        page,
        size,
        skip,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
    };
};
exports.paginationHelper = {
    calculatePagination,
};
