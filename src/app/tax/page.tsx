"use client";

import { useEffect, useState } from "react";
import { fetchTaxReport } from "@/services/tax";
import { Layout, Spin } from "antd";
import { Sider } from "@/components/Sider";
import Title from "antd/es/typography/Title";
import LogoutButton from "@/components/Logout";
import { Content, Header } from "antd/es/layout/layout";
import useAuth from "@/hooks/useAuth";
import { HeaderComponent } from "@/components/Header";

const TaxReport: React.FC = () => {
  const user = useAuth();
  const [selectedKey, setSelectedKey] = useState("/tax");
  const [report, setReport] = useState({ totalReceitas: 0, totalImpostos: 0 });

  useEffect(() => {
    async function loadReport() {
      const data = await fetchTaxReport();
      setReport(data);
    }
    loadReport();
  }, []);

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
          <Title level={3} style={{ margin: "16px" }}>
            Módulo Fiscal
          </Title>
          <p className="text-lg">
            Total de Receitas: R$ {report.totalReceitas.toFixed(2)}
          </p>
          <p className="text-lg">
            Total de Impostos: R$ {report.totalImpostos.toFixed(2)}
          </p>
          <p className="text-lg font-bold">
            Saldo Líquido: R${" "}
            {(report.totalReceitas - report.totalImpostos).toFixed(2)}
          </p>
        </Content>
      </Layout>
    </Layout>
  );
};

export default TaxReport;
