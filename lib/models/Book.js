const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM books;'
    );
    const data = rows.map((row) => new Book(row));
    return data;
  }
}

module.exports = { Book };
