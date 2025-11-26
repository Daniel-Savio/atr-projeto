import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Table, QrCode, Shield, BarChart } from "lucide-react";
import { Link } from "react-router";

import logo from "../../assets/logo.png";

export default function Admin() {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4 min-h-[86vh]">
      <header className="flex flex-col text-center items-center p-2 gap-9 mb-8">

       <Shield className="size-26 text-red-600" />
        <p className="text-zinc-600">
          Selecione uma das opções abaixo para gerenciar o sistema.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl px-4">
        <Link to="/admin/invoices">
          <Card className="flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <Table className="size-12 mb-4 text-zinc-800" />
              <CardTitle>Listar Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-zinc-600">
                Visualize todas as notas fiscais emitidas.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/qr-codes">
          <Card className="flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <QrCode className="size-12 mb-4 text-zinc-800" />
              <CardTitle>Gerar QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-zinc-600">
                Crie e imprima novos QR codes para as comandas.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/reports">
          <Card className="flex flex-col items-center justify-center p-6 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-col items-center">
              <BarChart className="size-12 mb-4 text-zinc-800" />
              <CardTitle>Relatórios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-zinc-600">
                Visualize relatórios de vendas.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  );
}
