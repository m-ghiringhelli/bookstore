const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    if (row.authors) this.authors = row.authors;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM books;'
    );
    const data = rows.map((row) => new Book(row));
    return data;
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT 
      books.*,
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE authors.id IS NOT NULL), '[]'
      ) as authors from books
        LEFT JOIN books_authors on books.id = books_authors.book_id
        LEFT JOIN authors on books_authors.author_id = authors.id
        WHERE books.id = $1
        GROUP BY books.id`,
      [id]
    );
    if (!rows[0]) return null;
    return new Book(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) RETURNING *',
      [title, released]
    );
    return new Book(rows[0]);
  }
}

module.exports = { Book };
