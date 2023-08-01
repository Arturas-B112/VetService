const express = require('express');
const mysql = require('mysql2/promise');
const Joi = require('joi');
const logger = require('../../logger');
const { dbConfig } = require('../../config');

const router = express.Router();

const presSchema = Joi.object({
  medication_id: Joi.number().required(),
  pet_id: Joi.number().required(),
  comment: Joi.string().trim().required(),
});

router.get('/:id', async (req, res) => {
  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    SELECT *
    FROM prescriptions
    LEFT JOIN medications
    ON medications.id = prescriptions.medication_id
    WHERE prescriptions.pet_id = ${req.params.id}
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
    userInput = await presSchema.validateAsync(userInput);
  } catch (err) {
    logger.error(err);
    return res.status(400).send({ err: 'Incorrect data passed' });
  }

  try {
    const con = await mysql.createConnection(dbConfig);
    const [data] = await con.execute(`
    INSERT INTO prescriptions (medication_id, pet_id, comment)
    VALUES (${mysql.escape(userInput.medication_id)},
    ${mysql.escape(userInput.pet_id)},
    ${mysql.escape(userInput.comment)})`);
    await con.end();

    return res.send(data);
  } catch (err) {
    logger.error(err);
    return res.status(500).send({ err: 'Server error. Please try again.' });
  }
});

module.exports = router;
