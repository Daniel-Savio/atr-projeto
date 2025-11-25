import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  CreditCard,
  Shield,
  QrCode,
} from "lucide-react";
import type { Route } from "./+types/home";
import logo from "../assets/logo.png";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coração Gaucho" },
    { name: "description", content: "Bem vindo ao restaurante Coração Gaucho" },
  ];
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-9 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[300px] max-w-[100vw] p-4">
            <img
              src={logo}
              alt="React Router"
              className="block w-full dark:hidden"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl px-4">
          <Link to="/comanda">
            <Card className="flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <QrCode className="size-12 mb-4 text-zinc-800" />
                <CardTitle>Comanda</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-zinc-600">
                  Abra uma nova comanda ou gerencie uma existente.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/pagamento">
            <Card className="flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <CreditCard className="size-12 mb-4 text-zinc-800" />
                <CardTitle>Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-zinc-600">
                  Realize o pagamento da sua comanda de forma rápida e segura.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin">
            <Card className="flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-col items-center">
                <Shield className="size-12 mb-4 text-zinc-800" />
                <CardTitle>Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-zinc-600">
                  Acesse o painel de administração para gerenciar o sistema.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}

