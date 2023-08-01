const express = require('express');
const cors = require('cors');
const logger = require('./logger');

const { port } = require('./config');

const { pets, medications, logs, prescriptions } = require('./routes/v1');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1/pets/', pets);
app.use('/v1/meds/', medications);
app.use('/v1/logs/', logs);
app.use('/v1/prescriptions/', prescriptions);

app.get('/', (req, res) => {
  res.send({ msg: 'Server is running' });
});

app.all('*', (req, res) => {
  logger.warn(`Page not found: ${req.url}`);
  res.status(404).send({ error: 'Page not found' });
});

app.listen(port, () => logger.info(`Listening on port ${port}`));
