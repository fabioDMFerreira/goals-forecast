import { getRandomTransaction } from './generateRandomData';


describe('getRandomData', () => {
  describe('getRandomTransaction', () => {
    it('should return a transaction', () => {
      const transaction = getRandomTransaction();

      expect(transaction).toBeTruthy();
    });
  });

  // it('test', () => {
  //   const transactions = [];

  //   for (let i = 0; i < 100; i++) {
  //     transactions.push(getRandomTransaction());
  //   }

  //   const creditTxCounter = transactions.reduce((counter, tx) => {
  //     if (tx.credit && +tx.credit > 0) {
  //       counter++;
  //     }

  //     return counter;
  //   }, 0);

  //   const yearTxCounter = transactions.reduce((counter, tx) => {
  //     if (tx.startDate && new Date(tx.startDate) > new Date(2019, 6, 30)) {
  //       counter++;
  //     }

  //     return counter;
  //   }, 0);

  //   expect(creditTxCounter).toBeLessThan(50);
  //   expect(creditTxCounter).toBeGreaterThan(5);
  //   expect(yearTxCounter).toBeGreaterThan(30);
  //   expect(yearTxCounter).toBeLessThan(70);
  // });
});
