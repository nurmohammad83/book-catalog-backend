export const bookSearchableFields = ['title', 'author', 'genre', 'categoryId'];
export const bookFilterableFields = ['searchTerm', 'category', 'categoryId'];

export const bookRelationalFields: string[] = ['categoryId'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
