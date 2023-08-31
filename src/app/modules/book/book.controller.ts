import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendRespons';
import httpStatus from 'http-status';
import { BookService } from './book.service';

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book create successfully',
    success: true,
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getAllFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Books retrieved successfully',
    success: true,
    data: result,
  });
});

const getByIdFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book retrieved successfully',
    success: true,
    data: result,
  });
});

const updateByIdFromDb = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const result = await BookService.updateByIdFromDb(id, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book update successfully',
    success: true,
    data: result,
  });
});

const deleteByIdFromDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Book delete successfully',
    success: true,
    data: result,
  });
});

export const BookController = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
  insertIntoDb,
};
