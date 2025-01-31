import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Button } from "antd"; // Importando o componente Button do Ant Design

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <Button onClick={handleLogout} type="primary" danger>
      Sair
    </Button>
  );
}
