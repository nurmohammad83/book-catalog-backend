import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IOrderResponse } from './order.interface';
import { JwtPayload } from 'jsonwebtoken';

const createOrder = async (
  user: JwtPayload | null,
  orderData: IOrderResponse
): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: user?.userId,
      orderedBooks: orderData.orderedBooks,
    },
  });

  return result;
};

const getAllFromDb = async (): Promise<Order[] | null> => {
  const result = await prisma.order.findMany();
  return result;
};

const getOrderByCustomerFromDb = async (
  user: JwtPayload | null
): Promise<Order[] | null> => {
  // if (Role.customer !== user?.userId) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Your not customer');
  // }
  const result = await prisma.order.findMany({
    where: {
      userId: user?.userId,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllFromDb,
  getOrderByCustomerFromDb,
};
