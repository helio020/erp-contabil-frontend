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

  return {
    createTransaction,
  };
};

export default useFinanceTransaction;
