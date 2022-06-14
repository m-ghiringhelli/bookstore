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
  
  it('should get a book by id and display book info including authors', async () => {
    const res = await request(app).get('/books/1');
    const talisman = {
      title: 'The Talisman',
      released: 1984,
      authors: [
        { 
          id: 1,
          name: 'Stephen King'
        },
        {
          id: 2,
          name: 'Peter Straub'
        }
      ]
    };
    expect(res.body).toEqual(talisman);
  });

  afterAll(() => {
    pool.end();
  });
});
