const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');

const router = express.Router();

const medSchema = Joi.object({
  name: Joi.string().alphanum().trim().required(),
  description: Joi.string().trim().required(),
});

router.get('/', async (req, res) => {
  const limit = [10, 50, 100, 250].includes(Number(req.query.limit))
    ? req.query.limit
    : 50;

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    SELECT *
    FROM medications
    LIMIT ${limit}
    `);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server error. Please try again.' });
  }
});

router.post('/', async (req, res) => {
  let userInput = req.body;

  try {
    userInput = await medSchema.validateAsync(userInput);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: 'Incorrect data passed' });
  }

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    INSERT INTO medications (name, description)
    VALUES (${mysql.escape(userInput.name)},
    ${mysql.escape(userInput.description)})`);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server error. Please try again.' });
  }
});

module.exports = router;
