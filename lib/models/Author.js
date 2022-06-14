const pool = require('../utils/pool');

class Author {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    if (row.dob) {
      this.dob = row.dob;
      this.pob = row.pob;
      this.books = row.books;
    }
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT authors.id, authors.name FROM authors'
    );
    const data = rows.map((row) => (new Author(row)));
    return data;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      // eslint-disable-next-line quotes
      `SELECT
      authors.*,
      COALESCE(
        json_agg(to_jsonb(books))
        FILTER (WHERE books.id IS NOT NULL), '[]'
        ) as books from authors
        LEFT JOIN books_authors on authors.id = books_authors.author_id
        LEFT JOIN books on books_authors.book_id = books.id
        WHERE authors.id = $1
        GROUP BY authors.id`,
      [id]
    );
    if (!rows[0]) return null;
    const author = new Author(rows[0]);
    const parsedAuthor = {
      name: author.name,
      dob: author.dob,
      pob: author.pob,
      books: author.books
    };
    return parsedAuthor;
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) RETURNING *',
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }
}

module.exports = { Author };
