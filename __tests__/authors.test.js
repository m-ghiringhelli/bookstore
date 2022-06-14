const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { Author } = require('../lib/models/Author');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  it.skip('authors route should return authors as json data', async () => {
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

  it.skip('should get an author by id and display author and books data', async () => {
    const res = await request(app).get('/authors/2');
    const peterStraub = {
      name: 'Peter Straub',
      dob: '1943-03-02',
      pob: 'Milwaukee, WI',
      books: [
        {
          id: 1,
          title: 'The Talisman',
          released: 1984
        },
        {
          id: 4,
          title: 'Koko',
          released: 1988
        }
      ]
    };
    expect(res.body).toEqual(peterStraub);
  });

  it('should add a new author', async () => {
    const author = new Author({
      name: 'Kurt Vonnegut',
      dob: '1922-11-11',
      pob: 'Indianapolis, IN'
    });
    const res = await request(app).post('/authors').send(author);
    expect(res.body.name).toEqual(author.name);
    expect(res.body.dob).toEqual(author.dob);
    expect(res.body.pob).toEqual(author.pob);
  });

  afterAll(() => {
    pool.end();
  });
});
