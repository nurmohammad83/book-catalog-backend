import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'user create successfully',
    success: true,
    data: result,
  });
});

export const UserController = { insertIntoDb };
