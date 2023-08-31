import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'users retrieved successfully',
    success: true,
    data: result,
  });
});

const getByIdFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'user retrieved successfully',
    success: true,
    data: result,
  });
});

const updateByIdFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await UserService.updateByIdFromDb(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'user update successfully',
    success: true,
    data: result,
  });
});

const deleteByIdFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'user delete successfully',
    success: true,
    data: result,
  });
});

export const UserController = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
};
