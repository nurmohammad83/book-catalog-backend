import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import { ILoginUser } from './auth.interface';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

const insertIntoDb = async (userData: User) => {
  userData.password = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_rounds)
  );
  const result = await prisma.user.create({
    data: userData,
  });
  return result;
};

const loginUser = async (
  payload: ILoginUser
): Promise<{ accessToken: string; refreshToken: string }> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const isMatchPass = await bcrypt.compare(password, isUserExist?.password);
  if (isUserExist?.password && !isMatchPass) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incorrect password!');
  }

  // access token and refresh token
  const userEmail = isUserExist?.email;
  const role = isUserExist?.role;
  const accessToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as number | string
  );

  const refreshToken = jwtHelpers.createToken(
    { userEmail, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as number | string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = { insertIntoDb, loginUser };
