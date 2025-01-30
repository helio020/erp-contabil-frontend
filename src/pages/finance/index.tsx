import { useState, useEffect } from "react";
import api from "@/app/services/api";
import FinanceForm from "@/app/components/FinanceForm";
import FinanceTable from "@/app/components/FinanceTable";

export default function Finance() {
  const [transactions, setTransactions] = useState([]);

  // Carrega transações ao iniciar
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Função para buscar transações do backend
  const fetchTransactions = async () => {
    try {
      const response = await api.get("/finance-transaction?page=1&perPage=10");
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Módulo Financeiro</h1>
      <FinanceForm onTransactionAdded={fetchTransactions} />
      <FinanceTable transactions={transactions} />
    </div>
  );
}
