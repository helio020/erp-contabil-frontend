import { message } from "antd";
import api from "./api";
import Transaction from "../interfaces/Transaction";

const useFinanceTransaction = () => {
  const createTransaction = async (transaction: Transaction): Promise<void> => {
    try {
      await api.post("/create-finance-transaction", transaction);
    } catch (error) {
      console.error("Erro ao cadastrar transação:", error);
      message.error("Erro ao cadastrar transação");
    }
  };

  const updateTransaction = async (
    id: any,
    transaction: Transaction
  ): Promise<void> => {
    try {
      await api.put(`/update-finance-transaction/${id}`, transaction);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      message.error("Erro ao atualizar transação");
    }
  };

  return {
    createTransaction,
    updateTransaction,
  };
};

export default useFinanceTransaction;
