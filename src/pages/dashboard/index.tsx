import React, { useState } from "react";
import { Layout, Typography, Spin } from "antd";
import useAuth from "@/app/hooks/useAuth";
import Finance from "./finance";
import LogoutButton from "@/components/Logout";
import { Sider } from "@/components/Sider";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const user = useAuth();
  const [selectedKey, setSelectedKey] = useState("1");

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "1":
        return <Paragraph>Este é seu painel de controle.</Paragraph>;
      case "2":
        return <Finance />;
      case "3":
        return <Paragraph>Outro conteúdo.</Paragraph>;
      default:
        return <Paragraph>Este é seu painel de controle.</Paragraph>;
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
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
