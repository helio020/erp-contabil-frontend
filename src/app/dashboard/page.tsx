"use client";

import React, { useState } from "react";
import { Layout, Typography, Spin } from "antd";
import useAuth from "@/hooks/useAuth";
import { Sider } from "@/components/Sider";
import LogoutButton from "@/components/Logout";
import { HeaderComponent } from "@/components/Header";

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
        <HeaderComponent username={user.username} />
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
