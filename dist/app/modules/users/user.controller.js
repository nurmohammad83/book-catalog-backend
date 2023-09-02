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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_service_1 = require("./user.service");
const sendRespons_1 = __importDefault(require("../../../shared/sendRespons"));
const http_status_1 = __importDefault(require("http-status"));
const getAllFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllFromDb();
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Users retrieved successfully',
        success: true,
        data: result,
    });
}));
const getByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getByIdFromDb(req.params.id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'User fetched successfully',
        success: true,
        data: result,
    });
}));
const updateByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    const result = yield user_service_1.UserService.updateByIdFromDb(id, data);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'User updated successfully',
        success: true,
        data: result,
    });
}));
const deleteByIdFromDb = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.deleteByIdFromDb(req.params.id);
    (0, sendRespons_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Users deleted successfully',
        success: true,
        data: result,
    });
}));
exports.UserController = {
    getAllFromDb,
    getByIdFromDb,
    updateByIdFromDb,
    deleteByIdFromDb,
};
