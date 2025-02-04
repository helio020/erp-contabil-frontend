import { Menu, Layout } from "antd";
import { useRouter } from "next/router";

interface SiderProps {
  selectedKey: string;
  handleMenuClick: (e: { key: string }) => void;
}

export const Sider = ({ selectedKey, handleMenuClick }: SiderProps) => {
  const { Sider } = Layout;
  const router = useRouter();

  const onMenuClick = (e: { key: string }) => {
    handleMenuClick(e);
    router.push(e.key);
  };

  return (
    <Sider>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={onMenuClick}
      >
        <Menu.Item key="/dashboard">Painel de Controle</Menu.Item>
        <Menu.Item key="/finance">Financeiro</Menu.Item>
        <Menu.Item key="/other">Outro</Menu.Item>
      </Menu>
    </Sider>
  );
};
