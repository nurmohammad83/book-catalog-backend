import { Order, Role } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IOrderResponse } from './order.interface';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';

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

const getAllFromDb = async (
  user: JwtPayload | null
): Promise<Order[] | void> => {
  if (user?.role === Role.admin) {
    const result = await prisma.order.findMany();
    return result;
  } else if (user?.role === Role.customer) {
    const result = await prisma.order.findMany({
      where: {
        userId: user?.userId,
      },
    });
    return result;
  }
};
const getOrderByIdFromDb = async (
  id: string,
  user: JwtPayload | null
): Promise<Order | null> => {
  if (user?.role !== Role.customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Forbidden');
  }
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const OrderService = {
  createOrder,
  getAllFromDb,
  getOrderByIdFromDb,
};
