-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists books;
DROP table if exists authors;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT INTO books (title, released) VALUES
('The Talisman', 1984),
('The Shining', 1977),
('Pet Sematary', 1983),
('Koko', 1988);

CREATE table authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob DATE,
  pob VARCHAR
);

INSERT INTO authors (name, dob, pob) VALUES
('Stephen King', '1947-09-21', 'Portland, ME'),
('Peter Straub', '1943-03-02', 'Milwaukee, WI');