"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const book_constants_1 = require("./book.constants");
const insertIntoDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isCategoryExist = yield prisma_1.default.category.findFirst({
        where: {
            id: data.categoryId,
        },
    });
    if (!isCategoryExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Category data are not exist!');
    }
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
    return result;
});
const getAllFromDb = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const { page, size, skip, sortBy, sortOrder, maxPrice, minPrice } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const andConditions = [];
    if (maxPrice) {
        andConditions.push({
            price: {
                lte: maxPrice,
            },
        });
    }
    if (minPrice) {
        andConditions.push({
            price: {
                gte: minPrice,
            },
        });
    }
    if (searchTerm) {
        andConditions.push({
            OR: book_constants_1.bookSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (book_constants_1.bookRelationalFields.includes(key)) {
                    return {
                        [book_constants_1.bookRelationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const total = yield prisma_1.default.book.count({ where: whereConditions });
    const totalPage = Math.ceil(total / size);
    const result = yield prisma_1.default.book.findMany({
        take: size,
        skip,
        where: whereConditions,
        include: {
            category: true,
        },
        orderBy: sortBy && sortBy
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: 'desc' },
    });
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getByCategoryFromDb = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const total = yield prisma_1.default.book.count({ where: { categoryId: id } });
    const totalPage = Math.ceil(total / size);
    const result = yield prisma_1.default.book.findMany({
        take: size,
        skip,
        where: {
            categoryId: id,
        },
        include: {
            category: true,
        },
        orderBy: sortBy && sortBy
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: 'desc' },
    });
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
        include: {
            category: true,
        },
    });
    return result;
});
const deleteByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateByIdFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
exports.BookService = {
    getAllFromDb,
    getByIdFromDb,
    updateByIdFromDb,
    deleteByIdFromDb,
    insertIntoDb,
    getByCategoryFromDb,
};
