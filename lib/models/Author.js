const pool = require('../utils/pool');

class Author {
  id;
  name;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT authors.id, authors.name FROM authors'
    );
    const data = rows.map((row) => new Author(row));
    return data;
  }
}

module.exports = { Author };
