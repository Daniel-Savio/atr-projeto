import { useNavigate } from "react-router";
import OpendInvoices from "~/components/oppend-invoices";

export default function Pagamento() {
    const navigate = useNavigate();
    function handleReturnedCode(value: string) {
        console.log("Comanda selecionada para pagamento:", value)
        navigate(`/pagamento/${value}`);
    }
    return (
        <section className="flex justify-center items-center h-full p-4">
            <OpendInvoices returnedCode={(value: string) => handleReturnedCode(value)}></OpendInvoices>
        </section>
    )
}