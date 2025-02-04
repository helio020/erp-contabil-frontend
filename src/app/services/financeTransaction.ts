import { message } from "antd";
import api from "./api";
import Transaction from "../interfaces/Transaction";
import TransactionToCreate from "../interfaces/TransactionToCreate";

const callFinanceTransaction = () => {
  const createTransaction = async (
    transaction: TransactionToCreate
  ): Promise<void> => {
    try {
      await api.post("/create-finance-transaction", transaction);
    } catch (error) {
      console.error("Erro ao cadastrar transação:", error);
      message.error("Erro ao cadastrar transação");
    }
  };

  const updateTransaction = async (
    id: number,
    transaction: Transaction
  ): Promise<void> => {
    try {
      await api.put(`/update-finance-transaction/${id}`, transaction);
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      message.error("Erro ao atualizar transação");
    }
  };

  const deleteTransaction = async (id: number): Promise<void> => {
    try {
      await api.delete(`/delete-finance-transaction/${id}`);
    } catch (error) {
      console.error("Erro ao excluir transação:", error);
      message.error("Erro ao excluir transação");
    }
  };

  return {
    createTransaction,
    updateTransaction,
    deleteTransaction,
  };
};

export default callFinanceTransaction;
