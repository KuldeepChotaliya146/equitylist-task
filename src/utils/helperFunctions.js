
import simpleLedgerData from "../data/simple_ledger.json"
import duplicateLedgerData from "../data/duplicate_ledger.json"
import complicatedLedgerData from "../data/complicated_ledger.json"

const filterDuplicateLedgerData = (transactionData) => {
  const activityIds = []
  return transactionData.filter((transaction) => {
    if(activityIds.includes(transaction.activity_id)){
      return false
    } else {
      activityIds.push(transaction.activity_id)
      return true
    }
  })
}

const sortDataByDateDescending = (data) => {
  return data.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const fetchLedgerData = (transactionDataType) => {
  let transformedData = [];

  switch (transactionDataType) {
    case 'simple':
      transformedData = filterDuplicateLedgerData(simpleLedgerData);
      break;
    case 'duplicate':
      transformedData = filterDuplicateLedgerData(duplicateLedgerData);
      break;
    case 'complicated':
      transformedData = filterDuplicateLedgerData(complicatedLedgerData);
  }

  return sortDataByDateDescending(transformedData);
}

export const generateDescription = (transaction) => {
  switch (transaction.type) {
    case 'DEPOSIT':
      const source = transaction.source.id ? transaction.source.description : 'Unknown'
      return `Deposit from ${source} for ${transaction.destination.description}`;
    case 'INVESTMENT':
      return `Investment in ${transaction.destination.description}`;
    case 'REFUND':
      return `Refund from ${transaction.source.description} for ${transaction.destination.description}`;
    case 'WITHDRAWAL':
      return `Withdrawal from ${transaction.source.description} to ${transaction.destination.description}`;
    case 'TRANSFER':
      return `Transfer from ${transaction.source.description} to ${transaction.destination.description}`;
    default:
      return 'Transaction';
  }
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};