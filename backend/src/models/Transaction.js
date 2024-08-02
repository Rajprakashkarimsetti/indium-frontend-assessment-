class Transaction {
  constructor(id, title, category, amount, date) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.amount = amount;
    this.date = date;
  }
}

module.exports = Transaction;
