import useAuth from "@/app/hooks/useAuth";
import LogoutButton from "@/components/Logout";
import { Sider } from "@/components/Sider";
import { Layout, Spin } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import { useState } from "react";

const Other: React.FC = () => {
  const user = useAuth();
  const [selectedKey, setSelectedKey] = useState("/dashboard/other");

  const handleMenuClick = (e: any) => {
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
            <Paragraph>Other</Paragraph>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Other;
