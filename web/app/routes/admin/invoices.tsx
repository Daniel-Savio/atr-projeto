import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import InvoicesTable from "~/components/invoices-table";
import type { Order } from "types";
import { toast } from "sonner";
import { Skeleton } from "~/components/ui/skeleton";
import type { Route } from "./+types/invoices";

export async function clientLoader() {
    const res = await fetch("http://localhost:3000/orders");
    if (!res.ok) {
        toast.error("Falha ao buscar as notas.", { position: "top-right" });
        throw new Error("Failed to fetch invoices");
    }
    const data: { message: string, orders: Order[] } = await res.json();
    return data.orders;
}

export function HydrateFallback() {
    return (
        <main className="flex flex-col items-center pt-16 pb-4 min-h-[86vh] w-full px-4">
            <h1 className="text-3xl font-bold mb-8">Lista de Notas Fiscais</h1>
            <div className="w-full max-w-4xl">
                <Skeleton className="h-96 w-full" />
            </div>
        </main>
    )
}

export default function AdminInvoices({ loaderData }: Route.ComponentProps) {
    const navigate = useNavigate();

    const handleEdit = (orderId: string) => {
        navigate(`/comanda/${orderId}`);
        toast.info(`Redirecionando para editar a comanda: ${orderId}`);
    };

    const handleClose = (orderId: string) => {
        // Here you would typically make an API call to close the order
        toast.success(`Nota ${orderId} foi fechada! (simulação)`);
    };

    const handleDelete = (orderId: string) => {
        // Here you would typically make an API call to delete the order
        toast.error(`Nota ${orderId} foi deletada! (simulação)`);
    };

    return (
        <main className="flex flex-col items-center pt-16 pb-4 min-h-[86vh] w-full px-4">
            <h1 className="text-3xl font-bold mb-8">Lista de Notas Fiscais</h1>
            <div className="w-full max-w-4xl">
                <InvoicesTable orders={loaderData} onEdit={handleEdit} onClose={handleClose} onDelete={handleDelete} />
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
