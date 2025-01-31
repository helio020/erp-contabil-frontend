import { useState, useEffect } from "react";
import api from "@/app/services/api";
import FinanceForm from "@/components/FinanceForm";
import FinanceTable from "@/components/FinanceTable";
import { Layout, Typography } from "antd";

const { Title } = Typography;

interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  title: string;
  type: string;
  transaction_status: string;
}

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Carrega transações ao iniciar
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Função para buscar transações do backend
  const fetchTransactions = async () => {
    try {
      const response = await api.get("/list-finance-transactions");
      setTransactions(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Title level={3}>Módulo Financeiro</Title>
      <FinanceForm onTransactionAdded={fetchTransactions} />
      <FinanceTable transactions={transactions} />
    </Layout>
  );
}
