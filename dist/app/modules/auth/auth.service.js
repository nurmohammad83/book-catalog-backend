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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const ApiError_1 = __importDefault(require("../../../Errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const insertIntoDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // userData.password = await bcrypt.hash(
    //   userData.password,
    //   Number(config.bcrypt_salt_rounds)
    // );
    const result = yield prisma_1.default.user.create({
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // const isMatchPass = await bcrypt.compare(password, isUserExist?.password);
    // if (isUserExist?.password && !isMatchPass) {
    //   throw new ApiError(httpStatus.NOT_FOUND, 'Incorrect password!');
    // }
    if (isUserExist.password !== password) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Incorrect password!');
    }
    // access token and refresh token
    const userId = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id;
    const role = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role;
    const token = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        token,
        refreshToken,
    };
});
exports.AuthService = { insertIntoDb, loginUser };
