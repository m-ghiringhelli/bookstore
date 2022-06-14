const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('book route should return books as json data', async () => {
    const res = await request(app).get('/books');
    const books = res.body;
    const expected = books.map((book) => {
      return {
        id: book.id,
        title: book.title,
        released: book.released
      };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
