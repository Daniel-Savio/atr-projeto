import type { Order } from "types";
import { Button } from "./ui/button";
import { Separator } from "~/components/ui/separator";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router";
import { QrCode } from "lucide-react";

interface Props {
    returnedCode: (value: string) => void,
    orders: Order[],
}

export default function Invoices({ returnedCode, orders }: Props) {
    const navigate = useNavigate();
    return (
        <div className="flex items-center w-full justify-center flex-col gap-5 text-center">
           
                {!orders.length && (
                    <>  
                        <h1 className="text-lg font-medium border-l-2 border-b-2 border-zinc-900 p-2">Nenhuma comanda aberta encontrada.</h1>
                        <Button className="flex gap-2" onClick={()=>{navigate("/comanda")}}>Criar nova comanda <QrCode></QrCode></Button>
                    </>
                )}
                <ul className="flex flex-wrap justify-center gap-4">
                    {orders.map((order) => (
                        <li onClick={() => returnedCode(order.id!)} key={order.id} className="relative cursor-pointer transition-all size-54 bg-zinc-100 shadow-md border-zinc-400 rounded-sm hover:size-56">
                            <Badge variant={order.status === "Open" ? "destructive" : "success"} className="absolute top-0 left-0">{order.status}</Badge>
                            <div className="w-full h-4/5 items-center text-center justify-center flex">
                                <h1 className="text-5xl font-bold">{order.number}</h1></div>
                            <div className="bg-zinc-300 py-2  w-full h-1/5 rounded-b-sm text-center items-center justify-around flex">
                                <h1> {order.total} R$ </h1>
                                <Button className="">
                                    Detalhar
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            

        </div>
    )
}
