import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total < value) {
        throw Error('Saldo insuficiente');
      }
    }

    const transaction = new Transaction({ title, value, type });

    this.transactionsRepository.create(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
