import React from "react";
import { Table } from "antd";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  transaction_status: string;
}

interface FinanceTableProps {
  transactions: Transaction[];
}

const columns = [
  {
    title: "Título",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Valor",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Status",
    dataIndex: "transaction_status",
    key: "transaction_status",
  },
];

export default function FinanceTable({ transactions }: FinanceTableProps) {
  return (
    <div className="border rounded shadow p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Lista de Transações
      </h2>
      <Table columns={columns} dataSource={transactions} rowKey="id" />
    </div>
  );
}
