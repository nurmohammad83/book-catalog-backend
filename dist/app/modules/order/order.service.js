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
exports.OrderService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrder = (user, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.order.create({
        data: {
            userId: user === null || user === void 0 ? void 0 : user.userId,
            orderedBooks: orderData.orderedBooks,
        },
    });
    return result;
});
const getAllFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((user === null || user === void 0 ? void 0 : user.role) === client_1.Role.admin) {
        const result = yield prisma_1.default.order.findMany();
        return result;
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === client_1.Role.customer) {
        const result = yield prisma_1.default.order.findMany({
            where: {
                userId: user === null || user === void 0 ? void 0 : user.userId,
            },
        });
        return result;
    }
});
const getOrderByIdFromDb = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    if ((user === null || user === void 0 ? void 0 : user.role) === client_1.Role.admin) {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id,
            },
        });
        return result;
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) === client_1.Role.customer) {
        const result = yield prisma_1.default.order.findUnique({
            where: {
                id,
            },
        });
        if ((result === null || result === void 0 ? void 0 : result.userId) !== user.userId) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Sorry!. You have no order!');
        }
        return result;
    }
});
exports.OrderService = {
    createOrder,
    getAllFromDb,
    getOrderByIdFromDb,
};
