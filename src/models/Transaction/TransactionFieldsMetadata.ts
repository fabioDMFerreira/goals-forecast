export interface Metadata {
  label: string;
  key: string;
  required?: boolean;
}

const TransactionFieldsMetadata: Metadata[] = [{
  label: 'Description',
  key: 'description',
  required: true,
}, {
  label: 'Tags',
  key: 'tags',
}, {
  label: 'Wallet',
  key: 'wallet',
}, {
  label: 'Start date',
  key: 'startDate',
  required: true,
}, {
  label: 'End date',
  key: 'endDate',
}, {
  label: 'Credit',
  key: 'credit',
}, {
  label: 'Debit',
  key: 'debit',
}, {
  label: 'Internal Transaction',
  key: 'isInternalTransaction',
},
// {
//   label: 'Particles',
//   key: 'particles'
// }, {
//   label: 'Interval',
//   key: 'interval',
// }, {
//   label: 'Total value',
//   key: 'totalValue'
// }
];

export default TransactionFieldsMetadata;
