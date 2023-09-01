type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  minPrice?: number | null;
  maxPrice?: number | null;
};

type IOptionsResults = {
  page: number;
  size: number;
  skip: number;
  sortBy: string;
  minPrice: number | null;
  maxPrice: number | null;
};

const calculatePagination = (option: IOptions): IOptionsResults => {
  const page = Number(option.page || 1);
  const size = Number(option.size || 10);
  const skip = (page - 1) * size;
  const sortBy = option.sortBy || 'createAt';
  const minPrice = Number(option.minPrice);
  const maxPrice = Number(option.maxPrice);

  return {
    page,
    size,
    skip,
    sortBy,
    minPrice,
    maxPrice,
  };
};

export const paginationHelper = {
  calculatePagination,
};
