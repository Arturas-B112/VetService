const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const { dbConfig } = require('../../config');

const router = express.Router();

const logSchema = Joi.object({
  pet_id: Joi.number().required(),
  description: Joi.string().trim().required(),
  status: Joi.string().trim().required(),
});

router.get('/:id', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    SELECT logs.id, logs.pet_id, pets.name, logs.description, logs.status
    FROM logs
    LEFT JOIN pets
    ON pets.id = logs.pet_id
    WHERE logs.pet_id = ${req.params.id}
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
    userInput = await logSchema.validateAsync(userInput);
  } catch (err) {
    console.log(err);
    return res.status(400).send({ err: 'Incorrect data passed' });
  }

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    INSERT INTO logs (pet_id, description, status)
    VALUES (${mysql.escape(userInput.pet_id)},
    ${mysql.escape(userInput.description)},
    ${mysql.escape(userInput.status)})`);
    await con.end();

    return res.send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: 'Server error. Please try again.' });
  }
});

module.exports = router;
