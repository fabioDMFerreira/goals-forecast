import { convertCurrencyToNumber, sumMonths } from 'utils/dateUtils/dateUtils';
import YYYYMMDD from 'utils/dateUtils/YYYYMMDD';
import getRandomString from 'utils/getRandomString';

import { TransactionConfig } from './TransactionConfig';


export default class Transaction {
  id: string;
  description: string;
  wallet?: string;
  isInternalTransaction?: boolean;
  _startDate: Date;
  _endDate: Date;
  _interval: number;
  _particles: number;
  _value: number;
  _totalValue: number;

  constructor(description: string, value: number, startDate?: Date) {
    this.description = description;
    this._startDate = startDate || new Date();
    this._endDate = this._startDate;

    this._value = value;
    this._particles = 1;
    this._totalValue = value * this._particles;
    this._interval = 1;
    this.id = getRandomString();
  }

  set particles(particles: number) {
    if (this._interval === 1) {
      this._endDate = sumMonths(this._endDate, particles - this._particles);
    }
    this._particles = particles;
    this.value = this._totalValue / particles;
  }

  get particles(): number {
    return this._particles;
  }

  set endDate(date: Date) {
    if (date < this._startDate) {
      this._startDate = date;
    }

    this._endDate = date;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set value(value: number) {
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  get totalValue(): number {
    return this._totalValue;
  }

  set totalValue(value: number) {
    this._totalValue = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(date: Date) {
    if (this._endDate && date > this._endDate) {
      this._endDate = date;
    }

    if (this._startDate === this._endDate) {
      this._endDate = date;
    }

    this._startDate = date;
  }

  get interval(): number {
    return this._interval;
  }

  set interval(value: number) {
    this._interval = value;
    this._endDate = this._startDate;
  }

  static buildFromTransactionData(transactionData: TransactionConfig): Transaction {
    let value;

    if (transactionData.credit && transactionData.credit !== '0') {
      value = convertCurrencyToNumber(transactionData.credit);
    } else if (transactionData.debit && transactionData.debit !== '0') {
      value = -(convertCurrencyToNumber(transactionData.debit));
    } else {
      value = 0;
    }

    const startDate = transactionData.startDate ? new Date(transactionData.startDate) : new Date();

    const transaction = new this(transactionData.description, value, startDate);

    transaction.id = transactionData.id || transaction.id;
    transaction._particles = transactionData.particles ? +transactionData.particles : 1;
    transaction._interval = transactionData.interval ? +transactionData.interval : 1;
    transaction._endDate = transactionData.endDate ? new Date(transactionData.endDate) : startDate;
    transaction._totalValue = transaction._value * transaction._particles;
    transaction.isInternalTransaction = transactionData.isInternalTransaction;

    return transaction;
  }

  static buildFromRawTransaction(transactionData: Transaction): Transaction {
    const transaction = new this(transactionData.description, transactionData._value);

    transaction.id = transactionData.id;
    transaction.description = transactionData.description;
    transaction._totalValue = transactionData._totalValue;
    transaction._particles = transactionData._particles;
    transaction._interval = transactionData._interval;
    transaction._startDate = transactionData._startDate;
    transaction._endDate = transactionData._endDate;
    transaction.isInternalTransaction = transactionData.isInternalTransaction;

    return transaction;
  }

  convertToTransactionData(): TransactionConfig {
    return {
      id: this.id,
      description: this.description,
      credit: `${this.value > 0 ? this.value : 0}`,
      debit: `${this.value < 0 ? this.value * -1 : 0}`,
      particles: `${this.particles}`,
      interval: `${this.interval}`,
      startDate: YYYYMMDD(this.startDate),
      endDate: YYYYMMDD(this.endDate),
      totalValue: `${this.totalValue}`,
      isInternalTransaction: this.isInternalTransaction,
    };
  }
}
