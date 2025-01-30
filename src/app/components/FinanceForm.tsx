import { useState } from "react";
import api from "../services/api";

interface FinanceFormProps {
  onTransactionAdded: () => void;
}

export default function FinanceForm({ onTransactionAdded }: FinanceFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("receita");
  const [status, setStatus] = useState("pendente");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await api.post("/finance-transaction", {
        data: { title, amount: parseFloat(amount), type, status },
      });
      setTitle("");
      setAmount("");
      onTransactionAdded(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao cadastrar transação:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Nova Transação</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        placeholder="Valor"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="pendente">Pendente</option>
        <option value="pago">Pago</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Adicionar
      </button>
    </form>
  );
}
