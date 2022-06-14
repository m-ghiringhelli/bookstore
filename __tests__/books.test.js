const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Book } = require('../lib/models/Book');

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
      id: '1',
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

  it('should add a new book', async () => {
    const book = new Book({
      title: 'The Stand',
      released: 1978
    });
    const res = await request(app).post('/books').send(book);
    expect(res.body.title).toEqual(book.title);
    expect(res.body.released).toEqual(book.released);
  });

  afterAll(() => {
    pool.end();
  });
});
