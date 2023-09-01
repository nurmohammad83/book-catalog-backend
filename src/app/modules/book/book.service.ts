/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericResponse } from './../../../interfaces/common';
import { Book, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';
import ApiError from '../../../Errors/ApiError';
import httpStatus from 'http-status';
import { IBookFilterRequest } from './book.interface';
import IPaginationOption from '../../../interfaces/pagination';
import { paginationHelper } from '../../../helper/paginationHelper';
import {
  bookSearchableFields,
  bookRelationalFields,
  bookRelationalFieldsMapper,
} from './book.constants';

const insertIntoDb = async (data: Book) => {
  const isCategoryExist = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
    },
  });
  if (!isCategoryExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category data are not exist!');
  }
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllFromDb = async (
  filters: IBookFilterRequest,
  options: IPaginationOption
): Promise<IGenericResponse<Book[] | null>> => {
  const { searchTerm, ...filterData } = filters;

  const { page, size, skip, sortBy, sortOrder, maxPrice, minPrice } =
    paginationHelper.calculatePagination(options);

  const andConditions = [];

  if (maxPrice) {
    andConditions.push({
      price: {
        lte: maxPrice,
      },
    });
  }

  if (minPrice) {
    andConditions.push({
      price: {
        gte: minPrice,
      },
    });
  }
  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const total = await prisma.book.count({ where: whereConditions });
  const totalPage = Math.ceil(total / size);
  const result = await prisma.book.findMany({
    take: size,
    skip,
    where: whereConditions,
    orderBy:
      sortBy && sortBy
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: 'desc' },
  });
  return {
    meta: {
      page,
      size,
      total,
      totalPage,
    },
    data: result,
  };
};

const getByIdFromDb = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  return result;
};
const deleteByIdFromDb = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateByIdFromDb = async (
  id: string,
  payload: Book
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

export const BookService = {
  getAllFromDb,
  getByIdFromDb,
  updateByIdFromDb,
  deleteByIdFromDb,
  insertIntoDb,
};
