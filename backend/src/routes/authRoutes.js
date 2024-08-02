const { Router } = require('express');
const { login, register } = require('../graphql/resolvers/authResolvers');

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const response = await login(null, { username, password });
    res.json(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const response = await register(null, { username, password, email });
    res.json(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
