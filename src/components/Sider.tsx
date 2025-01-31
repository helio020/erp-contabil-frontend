import { Menu, Layout } from "antd";

interface SiderProps {
  selectedKey: string;
  handleMenuClick: (e: any) => void;
}

export const Sider = ({ selectedKey, handleMenuClick }: SiderProps) => {
  const { Sider } = Layout;

  return (
    <Sider>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={handleMenuClick}
      >
        <Menu.Item key="1">Painel de Controle</Menu.Item>
        <Menu.Item key="2">Financeiro</Menu.Item>
        <Menu.Item key="3">Outro</Menu.Item>
      </Menu>
    </Sider>
  );
};
