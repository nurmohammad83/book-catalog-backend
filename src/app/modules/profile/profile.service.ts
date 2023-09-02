import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';

const getProfile = async (user: JwtPayload | null) => {
  const isUserExist = await prisma.user.findFirst({
    where: {
      id: user?.userId,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist');
  }

  const result = await prisma.user.findUnique({
    where: {
      id: user?.userId,
    },
  });
  return result;
};

export const ProfileService = {
  getProfile,
};
