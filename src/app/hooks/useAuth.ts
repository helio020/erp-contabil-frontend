import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

interface User {
  username: string;
  password: string;
}

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/");
      return;
    }

    // Obtém informações do usuário logado
    axios
      .get("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setUser(response.data))
      .catch(() => {
        Cookies.remove("token");
        router.push("/");
      });
  }, []);

  return user;
}
