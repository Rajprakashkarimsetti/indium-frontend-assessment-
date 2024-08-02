const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  getTransactions,
  getTransaction,
  addTransaction,
  deleteTransaction
} = require('../graphql/resolvers/transactionResolvers');

const router = Router();

router.use(authMiddleware);

router.get('/transactions', async (req, res) => {
  try {
    const transactions = await getTransactions();
    res.json(transactions);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/transaction/:id', async (req, res) => {
  try {
    const transaction = await getTransaction(null, { id: req.params.id });
    res.json(transaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/transaction', async (req, res) => {
  try {
    const { title, category, amount, date } = req.body;
    const transaction = await addTransaction(null, { title, category, amount, date });
    res.json(transaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/transaction/:id', async (req, res) => {
  try {
    const transaction = await deleteTransaction(null, { id: req.params.id });
    res.json(transaction);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
