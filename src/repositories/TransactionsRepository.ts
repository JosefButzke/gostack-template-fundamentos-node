import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    this.balance.income = this.transactions
      .filter(t => t.type === 'income')
      .reduce((total, currentValue) => {
        return total + currentValue.value;
      }, 0);

    this.balance.outcome = this.transactions
      .filter(t => t.type === 'outcome')
      .reduce((total, currentValue) => {
        return total + currentValue.value;
      }, 0);

    this.balance.total = this.balance.income - this.balance.outcome;
    return this.balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
