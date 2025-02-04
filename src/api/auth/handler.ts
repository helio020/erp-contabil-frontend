import { login } from "@/app/services/authService";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  const { identifier, password } = req.body;

  try {
    const { jwt, user } = await login(identifier, password);

    // Armazena o token no cookie do navegador
    res.setHeader(
      "Set-Cookie",
      `token=${jwt}; Path=/; HttpOnly; Secure; SameSite=Strict`
    );

    return res.status(200).json({ user, jwt });
  } catch (error) {
    return res.status(400).json({ message: `Credenciais inválidas. ${error}` });
  }
}
