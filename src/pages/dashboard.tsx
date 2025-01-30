import useAuth from "@/app/hooks/useAuth";
import Finance from "./finance";
import LogoutButton from "@/app/components/Logout";

export default function Dashboard() {
  const user = useAuth();

  if (!user) return <p>Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bem-vindo, {user.username}!</h1>
      <LogoutButton />
      <p>Este é seu painel financeiro.</p>
      <Finance />
    </div>
  );
}
