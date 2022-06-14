const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const book = await Book.getById(id);
    const bookAuthors = book.authors.map((author) => { 
      return { id: author.id, name: author.name };
    });
    const respData = {
      id: book.id,
      title: book.title,
      released: book.released,
      authors: bookAuthors
    };
    return (res.json(respData));
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
;
