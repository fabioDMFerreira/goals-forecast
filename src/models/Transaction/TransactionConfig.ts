export interface TransactionConfig {
  id?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  credit?: string;
  debit?: string;
  particles?: string;
  totalValue?: string;
  interval?: string;
  visible?: boolean;
  tags?: string[];
  selected?: boolean;
  wallet?: string;
  isInternalTransaction?: boolean;
}
