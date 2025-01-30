// src/services/authService.ts
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337/api";

export const login = async (identifier: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/local`, {
    identifier,
    password,
  });

  const { jwt, user } = response.data;

  // Armazena o token no cookie do navegador
  Cookies.set("token", jwt, { expires: 7 });

  return { user, jwt };
};
