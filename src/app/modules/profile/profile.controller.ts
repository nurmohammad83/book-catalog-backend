import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ProfileService } from './profile.service';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendRespons';

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await ProfileService.getProfile(user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

export const ProfileController = { getProfile };
