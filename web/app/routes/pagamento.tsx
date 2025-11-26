import { useNavigate } from "react-router";
import Invoices from "~/components/invoices";
import type { Order } from "../../types";
import { toast } from "sonner";

import { Skeleton } from "~/components/ui/skeleton";
import { Separator } from "~/components/ui/separator";
import type { Route } from "./+types/pagamento";
import { QRcodeScanner } from "~/components/qr-code-scanner";

export async function clientLoader() {
    const res = await fetch("https://churrascaria-api.chamber-vault.uk/opened/orders");
    if (!res.ok) {
        toast.error("Falha ao buscar comandas abertas.", { position: "top-right" });
       return [];
    }
    const data: { message: string, orders: Order[] } = await res.json();
    return data.orders;
}

export function HydrateFallback() {
    
    return (
        <div className="flex justify-center flex-col gap-5 text-center ml-6">
            <h1 className="text-xl font-bold">Comandas Abertas</h1>
            
            <Separator></Separator>
            <div className="flex flex-wrap justify-center gap-4 mx-auto">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="relative transition-all size-54 bg-zinc-100 shadow-md border-zinc-400 rounded-sm">
                        <Skeleton className="absolute top-2 left-2 h-5 w-16" />
                        <div className="w-full h-4/5 items-center text-center justify-center flex">
                            <Skeleton className="h-12 w-24" />
                        </div>
                        <div className="bg-zinc-300 py-2 w-full h-1/5 rounded-b-sm text-center items-center justify-around flex">
                            <Skeleton className="h-6 w-1/4" />
                            <Skeleton className="h-8 w-1/3" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default function Pagamento({ loaderData }: Route.ComponentProps) { // NOSONAR
    const navigate = useNavigate();
    
    function handleReturnedCode(value: string) {
        navigate(`/pagamento/${value}`);
    }

    async function handleQrCodeRead(value: string) {
       const {order} = await (await fetch(`https://churrascaria-api.chamber-vault.uk/orders/open/${value}`)).json();
       console.log(order);
       navigate(`/pagamento/${order.id}`);
    }

    return (
        <section className="flex flex-col justify-center items-center gap-4 h-full p-4 ml-6">
            <h1 className="text-xl font-bold">Comandas Abertas</h1>
            <QRcodeScanner returnedCode={(value) => handleQrCodeRead(value.rawValue)}></QRcodeScanner>
            <Separator></Separator>
              
            <Invoices returnedCode={(value: string) => handleReturnedCode(value)} orders={loaderData}></Invoices>`
            
        </section>
    )
}