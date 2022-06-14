const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const author = await Author.getById(id);
    return (res.json(author));
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.json(authors);
  });
