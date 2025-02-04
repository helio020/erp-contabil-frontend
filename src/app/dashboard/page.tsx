"use client";

import React, { useState } from "react";
import { Layout, Typography, Spin } from "antd";
import useAuth from "@/hooks/useAuth";
import { Sider } from "@/components/Sider";
import LogoutButton from "@/components/Logout";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const user = useAuth();
  const [selectedKey, setSelectedKey] = useState("/dashboard");

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
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
            <Paragraph>Este é seu painel de controle.</Paragraph>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
