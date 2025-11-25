import type { Order } from "types";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Spinner } from "./ui/spinner";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-select";
import { Badge } from "./ui/badge";

interface Props {
    returnedCode: (value: string) => void,
}

export default function Invoices({ returnedCode }: Props) {
    useEffect(() => {
        fetch("http://localhost:3000/orders").then((res) => res.json()).then((data: { message: string, orders: Order[] }) => {
            console.log("Fetched orders:", data);
            setLoaderData(data.orders);
            toast.success(`Comandas abertas encontradas: ${data.orders.length}`, { position: "top-right" });
        });
    }, []);

    const [loaderData, setLoaderData] = useState<Order[]>([]);

    
    return (
        <div className="flex justify-center flex-col gap-5 text-center ml-6">
            <h1 className="text-xl font-bold">Comandas Abertas</h1>
            <Separator></Separator>
            {loaderData.length === 0 ? (
                <Spinner className="h-10 w-full mb-2" />
            ) : (
                <ul className="flex flex-wrap justify-beteen gap-4">
                    {loaderData.map((order) => (
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
            )}

        </div>
    )
}
