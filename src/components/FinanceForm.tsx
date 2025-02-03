import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, Select } from "antd";
import useCategory from "@/app/services/useCategory";
import FinanceFormProps from "@/app/interfaces/FinanceFormProps";
import useFinanceTransaction from "@/app/services/useFinanceTransaction";

const FinanceForm: React.FC<FinanceFormProps> = ({ onTransactionAdded }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  const handleSubmit = async () => {
    try {
      const values = {
        title,
        amount,
        due_date: date,
        category,
        type,
        transaction_status: status,
      };

      await useFinanceTransaction().createTransaction(values);
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
      onTransactionAdded();
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await useCategory().listAllCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategories();
  }, []);

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
        <Select
          placeholder="Selecione a categoria"
          value={category || ""}
          onChange={(value) => setCategory(value)}
        >
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
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
