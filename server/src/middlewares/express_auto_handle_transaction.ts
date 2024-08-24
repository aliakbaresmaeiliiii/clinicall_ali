import { Transaction } from 'sequelize'
import { NextFunction, Response, Request } from 'express'

async function ExpressAutoHandleTransaction(
  req: any,
  res: Response,
  next: NextFunction
) {
  // Ensure _transaction is initialized
  req._transaction = req._transaction || {};

  res.once('finish', () => {
    const { _transaction } = req;

    if (!_transaction) {
      return;
    }

    const transactionKeys = Object.keys(_transaction);
    for (let i = 0; i < transactionKeys.length; i += 1) {
      const txn = _transaction[transactionKeys[i]] as Transaction & {
        finished?: string;
      };
      if (!txn?.finished) {
        const endpoint = req.originalUrl;
        console.warn(`endpoint ${endpoint} potentially can lead to bug`);
        console.log('AUTO COMMIT!!!');
        txn.commit();
      }
    }
  });

  next();
}

export default ExpressAutoHandleTransaction;
