import React, { useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import api from "@/app/services/api";

interface Transaction {
  title: string;
  amount: string;
  due_date: string;
  category: string;
  type: string;
  transaction_status: string;
}

interface FinanceFormProps {
  onTransactionAdded: () => void;
}

const FinanceForm: React.FC<FinanceFormProps> = ({ onTransactionAdded }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const addTransaction = async (transaction: Transaction) => {
    try {
      await api.post("/create-finance-transaction", transaction);
    } catch (error) {
      console.error("Erro ao cadastrar transação:", error);
      message.error("Erro ao cadastrar transação");
    }
  };

  const findCategory = async () => {
    try {
      const response = await api.get(`/category/${category}`);
      return response.data.id;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      return [];
    }
  };

  const handleSubmit = async () => {
    try {
      const categoryId = await findCategory();
      const values = {
        title,
        amount,
        due_date: date,
        category: categoryId,
        type,
        transaction_status: status,
      };

      await addTransaction(values);
      message.success("Transação cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar transação:", error);
      message.error("Erro ao cadastrar transação");
    } finally {
      setTitle("");
      setAmount("");
      setDate("");
      setCategory("");
      setType("");
      setStatus("");
      onTransactionAdded(); // Atualiza a lista de transações
    }
  };

  return (
    <Form onFinish={handleSubmit} className="mb-6 p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Nova Transação</h2>
      <Form.Item
        name="title"
        rules={[{ required: true, message: "Por favor, insira o título!" }]}
      >
        <Input
          placeholder="Título"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="amount"
        rules={[{ required: true, message: "Por favor, insira o valor!" }]}
      >
        <Input
          type="number"
          placeholder="Valor"
          value={amount || ""}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="date"
        rules={[{ required: true, message: "Por favor, insira a data!" }]}
      >
        <Input
          type="date"
          placeholder="Data"
          value={date || ""}
          onChange={(e) => setDate(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="category"
        rules={[{ required: true, message: "Por favor, insira a categoria!" }]}
      >
        <Input
          placeholder="Categoria"
          value={category || ""}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Item>
      <Form.Item name="type" rules={[{ required: true }]}>
        <Select
          placeholder="Selecione o tipo"
          value={type || ""}
          onChange={(value) => setType(value)}
        >
          <Select.Option value="receita">Receita</Select.Option>
          <Select.Option value="despesa">Despesa</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="status" rules={[{ required: true }]}>
        <Select
          placeholder="Selecione o status"
          value={status || ""}
          onChange={(value) => setStatus(value)}
        >
          <Select.Option value="pendente">Pendente</Select.Option>
          <Select.Option value="pago">Pago</Select.Option>
          <Select.Option value="vencido">Vencido</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Adicionar Transação
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FinanceForm;
