import { Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import LogoutButton from "./Logout";

interface User {
  username: string;
}

export const HeaderComponent = (user: User) => {
  return (
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
  );
};
