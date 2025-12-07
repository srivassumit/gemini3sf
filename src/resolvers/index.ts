import books from '../data/books.json';
import authors from '../data/authors.json';

export const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
  },
};
