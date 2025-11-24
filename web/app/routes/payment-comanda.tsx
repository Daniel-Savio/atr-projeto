import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import type { Order } from "../../types";
import { Skeleton } from "~/components/ui/skeleton";
import { Spinner } from "~/components/ui/spinner";
import type { Route } from "./+types/payment-comanda";
import { ScrollArea } from "~/components/ui/scroll-area";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { ArrowLeft, Check, Pencil } from "lucide-react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    const response = await fetch(`http://localhost:3000/orders/${params.id}`);
    if (!response.ok) {
        throw new Error("Order not found");
    }
    const order = await response.json();
    console.log(order)
    return order.order as Order;
}


export function HydrateFallback() {


    return (
        <div className="flex flex-col justify-center items-center mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle><h1 className="text-2xl font-bold mb-1 text-muted-foreground">Carregando Comanda...</h1> <Spinner /></CardTitle>
                    <CardDescription className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[150px]" />
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                    <Skeleton className="h-4 w-[350px]" />
                </CardContent>
            </Card>
        </div>
    )
}


export default function PaymentComanda({ loaderData }: Route.ComponentProps) {
    const order = loaderData;
    const navigate = useNavigate();

    const handleGoToOrders = () => {
        navigate('/comanda/' + loaderData.number)
        console.log("Navigating to orders...");
    };

    async function closeComanda() {
        console.log(loaderData.id)
        const response = await fetch(`http://localhost:3000/orders/close/${loaderData.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            toast.success('Comanda marcada como fechada com sucesso!', { position: 'top-right' });
            navigate('/pagamento');
        }

    }

    const allItems = [...(order.meals || []), ...(order.otherItems || [])];
    const totalAmount = allItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

    return (
        <div className="flex h-[86vh] justify-center items-center">

            <Card className="w-[96vw] mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Nota Fiscal #{order.number}</CardTitle>
                    <CardDescription>Visualização da nota fiscal</CardDescription>
                </CardHeader>
                <CardContent className="h-[45vh]">
                    <ScrollArea>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Comanda:</p>
                                <p className="text-xs">{order.id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-500">Data:</p>
                                <p className="text-base font-semibold">{new Date(order.date || "").toLocaleDateString()}</p>
                            </div>
                        </div>
                    </ScrollArea>

                    <Separator className="my-4" />

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Itens:</h3>
                        <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-600 border-b pb-2">
                            <div className="col-span-2">Item</div>
                            <div className="text-right">Preço</div>
                        </div>
                        {allItems.map((item, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2 text-sm py-2 border-b last:border-b-0">
                                <div className="col-span-2">{item.name}</div>
                                <div className="text-right">R$ {parseFloat(item.price).toFixed(2)}</div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex justify-between items-center mt-6">
                        <p className="text-lg font-semibold">Total:</p>
                        <p className="text-xl font-bold">R$ {totalAmount.toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm font-medium text-gray-500">Status:</p>
                        <p className={`text-sm font-semibold ${order.status === 'Closed' ? 'text-green-600' : 'text-orange-600'}`}>
                            {order.status === 'Closed' ? 'Fechada' : 'Aberta'}
                        </p>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-end gap-4 pt-6">
                    <Button className="flex gap-2 items-center" onClick={() => { navigate('/pagamento') }} >
                        <ArrowLeft></ArrowLeft> Voltar
                    </Button>
                    <Button className="flex items-center gap-2" variant="outline" onClick={handleGoToOrders} disabled={order.status === 'Closed'}>
                        Editar
                        <Pencil></Pencil>
                    </Button>
                    <Button variant={"success"} className="flex items-center gap-2" onClick={(e) => closeComanda()} disabled={order.status === 'Closed'}>
                        Fechar Nota
                        <Check></Check>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}