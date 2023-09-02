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
exports.CategoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const category_service_1 = require("./category.service");
const sendRespons_1 = __importDefault(require("../../../shared/sendRespons"));
const http_status_1 = __importDefault(require("http-status"));
const insertIntoDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.insertIntoDb(req.body);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Category created successfully',
        success: true,
        data: result,
    });
}));
const getAllFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.getAllFromDb();
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Categories fetched successfully',
        success: true,
        data: result,
    });
}));
const getByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.getByIdFromDb(req.params.id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Category fetched successfully',
        success: true,
        data: result,
    });
}));
const updateByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield category_service_1.CategoryService.updateByIdFromDb(id, data);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Category updated successfully',
        success: true,
        data: result,
    });
}));
const deleteByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.deleteByIdFromDb(req.params.id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Category deleted successfully',
        success: true,
        data: result,
    });
}));
exports.CategoryController = {
    getAllFromDb,
    getByIdFromDb,
    updateByIdFromDb,
    deleteByIdFromDb,
    insertIntoDb,
};
