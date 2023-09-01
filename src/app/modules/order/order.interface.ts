type OrderedBook = {
  bookId: number;
  quantity: number;
};

// Define a TypeScript type for the entire Order model
export type IOrderResponse = {
  orderedBooks: OrderedBook[];
};
