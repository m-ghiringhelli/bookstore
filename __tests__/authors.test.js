const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it('authors route should return authors as json data', async () => {
    const res = await request(app).get('/authors');
    const authors = res.body;
    const expected = authors.map((author) => {
      return { 
        id: author.id,
        name: author.name
      };
    });
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
