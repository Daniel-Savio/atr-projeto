import type { Order } from "types";
import { Button } from "./ui/button";
import { Separator } from "~/components/ui/separator";
import { Badge } from "./ui/badge";

interface Props {
    returnedCode: (value: string) => void,
    orders: Order[],
}

export default function Invoices({ returnedCode, orders }: Props) {
    
    return (
        <div className="flex items-center w-full justify-center flex-col gap-5 text-center">
           

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
