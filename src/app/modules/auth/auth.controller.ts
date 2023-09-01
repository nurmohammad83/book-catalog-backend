import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import config from '../../../config';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'User created successfully!',
    success: true,
    data: result,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  // set cookies
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in   successfully',
    data: others,
  });
});

export const AuthController = { insertIntoDb, loginUser };
