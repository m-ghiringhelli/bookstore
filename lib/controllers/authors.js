const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const author = await Author.getById(id);
    return (res.json(author));
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.json(authors);
  });
