import books from '../data/books.json';

export const resolvers = {
  Query: {
    books: () => books,
  },
};
