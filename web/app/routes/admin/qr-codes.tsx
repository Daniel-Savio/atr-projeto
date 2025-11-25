import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Input } from "~/components/ui/input";

export default function AdminQrCodes() {
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4 min-h-[86vh]">
      <h1 className="text-3xl font-bold mb-8">Gerador de QR Code</h1>
      <p className="mb-8">Em desenvolvimento...</p>
      {/* Placeholder for QR code generator */}
      <div className="w-full max-w-md border rounded-lg p-4 text-center">
        <p className="mb-4">Insira o número da comanda:</p>
        <Input type="number" className="p-2 border rounded-md w-full" placeholder="Ex: 123" />
        <Button className="mt-4">Gerar QR Code</Button>
      </div>
      <div className="mt-8">
        <Link to="/admin">
          <Button className="flex gap-2 items-center">
            <ArrowLeft /> Voltar
          </Button>
        </Link>
      </div>
    </main>
  );
}
