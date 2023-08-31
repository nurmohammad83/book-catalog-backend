import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDb = async (data: Book) => {
  const result = await prisma.book.create({
    data,
  });
  return result;
};

const getAllFromDb = async (): Promise<Book[] | null> => {
  const result = await prisma.book.findMany();
  return result;
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
