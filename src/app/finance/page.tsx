"use client";

import React, { useEffect, useState } from "react";
import { Layout, Typography, Spin } from "antd";
import useAuth from "@/hooks/useAuth";
import api from "@/services/api";
import { Sider } from "@/components/Sider";
import LogoutButton from "@/components/Logout";
import FinanceForm from "@/components/FinanceForm";
import FinanceTable from "@/components/FinanceTable";

const { Header, Content } = Layout;
const { Title } = Typography;

const Finance: React.FC = () => {
  const user = useAuth();
  const [selectedKey, setSelectedKey] = useState("/dashboard/finance");
  const [transactions, setTransactions] = useState([]);

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("/list-finance-transactions");
      setTransactions(response.data.results);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  if (!user) return <Spin tip="Carregando..." />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider selectedKey={selectedKey} handleMenuClick={handleMenuClick} />
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={3} style={{ margin: "16px" }}>
            Bem-vindo, {user.username}!
          </Title>
          <LogoutButton />
        </Header>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Title level={3}>Módulo Financeiro</Title>
            <FinanceForm onTransactionAdded={fetchTransactions} />
            <FinanceTable transactions={transactions} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Finance;
