interface Transaction {
  key: any;
  id: number;
  title: string;
  amount: number;
  due_date: string;
  category: string;
  type: string;
  transaction_status: string;
}

export default Transaction;
