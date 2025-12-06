import { resolvers } from '../index.js';

describe('Resolvers', () => {
  describe('Query.books', () => {
    it('should return an array of books', () => {
      const result = resolvers.Query.books();
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return books with title and author properties', () => {
      const result = resolvers.Query.books();
      
      for (const book of result) {
        expect(book).toHaveProperty('title');
        expect(book).toHaveProperty('author');
        expect(typeof book.title).toBe('string');
        expect(typeof book.author).toBe('string');
      }
    });

    it('should return at least two books', () => {
      const result = resolvers.Query.books();
      expect(result.length).toBeGreaterThanOrEqual(2);
    });

    it('should return "The Awakening" by Kate Chopin', () => {
      const result = resolvers.Query.books();
      const book = result.find((b: any) => b.title === 'The Awakening');
      
      expect(book).toBeDefined();
      expect(book?.author).toBe('Kate Chopin');
    });

    it('should return "City of Glass" by Paul Auster', () => {
      const result = resolvers.Query.books();
      const book = result.find((b: any) => b.title === 'City of Glass');
      
      expect(book).toBeDefined();
      expect(book?.author).toBe('Paul Auster');
    });
  });
});
