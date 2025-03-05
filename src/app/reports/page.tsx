"use client";

import { HeaderComponent } from "@/components/Header";
import LogoutButton from "@/components/Logout";
import { Sider } from "@/components/Sider";
import useAuth from "@/hooks/useAuth";
import { FinanceSummary } from "@/interfaces/FinanceSummary";
import callFinanceTransaction from "@/services/financeTransaction";
import { Layout, Spin, Tooltip } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";

const Reports: React.FC = () => {
  const user = useAuth();
  const [selectedKey, setSelectedKey] = useState("/reports");
  const [summary, setSummary] = useState<FinanceSummary>({
    receitas: 0,
    despesas: 0,
    saldo: 0,
  });
  const { fetchFinanceSummary } = callFinanceTransaction();

  useEffect(() => {
    async function loadSummary() {
      const data = await fetchFinanceSummary();
      setSummary(data);
    }
    loadSummary();
  }, []);

  const pieData = [
    { name: "Receitas", value: summary.receitas },
    { name: "Despesas", value: summary.despesas },
    { name: "Saldo", value: summary.saldo },
  ];

  const COLORS = ["#28a745", "#dc3545", "#007bff"];

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
  };

  if (!user) return <Spin tip="Carregando..." />;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider selectedKey={selectedKey} handleMenuClick={handleMenuClick} />
      <Layout>
        <HeaderComponent username={user.username} />
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <h1 className="text-2xl font-bold mb-4">Relatório Financeiro</h1>
            <div className="border p-4 rounded shadow flex justify-center">
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
            <div className="mt-6">
              <p className="text-green-500 font-bold">
                Total de Receitas: R$ {summary.receitas.toFixed(2)}
              </p>
              <p className="text-red-500 font-bold">
                Total de Despesas: R$ {summary.despesas.toFixed(2)}
              </p>
              <p className="text-blue-500 font-bold">
                Saldo Atual: R$ {summary.saldo.toFixed(2)}
              </p>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Reports;
