import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'user create successfully',
    success: true,
    data: result,
  });
});

export const AuthController = { insertIntoDb };
