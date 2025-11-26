import { Link, useLoaderData } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { Order } from "types";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Route } from "./+types/invoices";

export async function clientLoader() {
    const res = await fetch("https://churrascaria-api.chamber-vault.uk/orders");
    if (!res.ok) {
        toast.error("Falha ao buscar as notas.", { position: "top-right" });
        throw new Error("Failed to fetch invoices");
    }
    const data: { message: string, orders: Order[] } = await res.json();
    return data.orders;
}

const processDataForChart = (orders: Order[]) => {
    const dailyTotals: { [key: string]: number } = {};

    orders.forEach(order => {
        if (order.date && order.total) {
            const date = new Date(order.date).toLocaleDateString();
            const total = parseFloat(order.total);
            if (!dailyTotals[date]) {
                dailyTotals[date] = 0;
            }
            dailyTotals[date] += total;
        }
    });

    return Object.keys(dailyTotals).map(date => ({
        date,
        total: dailyTotals[date],
    }));
};

export default function AdminReports() {
    const orders = useLoaderData<typeof clientLoader>();
    const chartData = processDataForChart(orders);

    return (
        <main className="flex flex-col items-center pt-16 pb-4 min-h-[86vh] w-full px-4">
            <h1 className="text-3xl font-bold mb-8">Relatório de Vendas</h1>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="oklch(70.4% 0.191 22.216)" name="Total de Vendas (R$)" />
                    </BarChart>
                </ResponsiveContainer>
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
