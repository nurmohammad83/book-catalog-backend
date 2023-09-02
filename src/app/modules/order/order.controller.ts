import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendRespons';
import { OrderService } from './order.service';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await OrderService.createOrder(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Order created successfully',
    success: true,
    data: result,
  });
});

const getAllFromDb = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await OrderService.getAllFromDb(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const getOrderByIdFromDb = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const user = req.user;
  const result = await OrderService.getOrderByIdFromDb(orderId, user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order fetched successfully',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllFromDb,
  getOrderByIdFromDb,
};
