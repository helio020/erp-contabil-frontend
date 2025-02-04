import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "antd";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/");
  };

  return (
    <Button
      onClick={handleLogout}
      type="primary"
      danger
      style={{ margin: "0 10px" }}
    >
      Sair
    </Button>
  );
}
