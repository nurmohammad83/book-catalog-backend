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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendRespons_1 = __importDefault(require("../../../shared/sendRespons"));
const http_status_1 = __importDefault(require("http-status"));
const book_service_1 = require("./book.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../../constants/pagination");
const book_constants_1 = require("./book.constants");
const insertIntoDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.insertIntoDb(req.body);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Book created successfully',
        success: true,
        data: result,
    });
}));
const getAllFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constants_1.bookFilterableFields);
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield book_service_1.BookService.getAllFromDb(filters, options);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Books fetched successfully',
        success: true,
        data: result,
    });
}));
const getByCategoryFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    const options = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield book_service_1.BookService.getByCategoryFromDb(categoryId, options);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Books with associated category data fetched successfully',
        success: true,
        data: result,
    });
}));
const getByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.getByIdFromDb(req.params.id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Book fetched successfully',
        success: true,
        data: result,
    });
}));
const updateByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield book_service_1.BookService.updateByIdFromDb(id, data);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Book updated successfully',
        success: true,
        data: result,
    });
}));
const deleteByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookService.deleteByIdFromDb(req.params.id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Book is deleted successfully',
        success: true,
        data: result,
    });
}));
exports.BookController = {
    getAllFromDb,
    getByIdFromDb,
    updateByIdFromDb,
    getByCategoryFromDb,
    deleteByIdFromDb,
    insertIntoDb,
};
