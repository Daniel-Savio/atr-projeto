import { useNavigate } from "react-router";
import Invoices from "~/components/invoices";

export default function Pagamento() {
    const navigate = useNavigate();
    function handleReturnedCode(value: string) {
        console.log("Comanda selecionada para pagamento:", value)
        navigate(`/pagamento/${value}`);
    }
    return (
        <section className="flex justify-center items-center h-full p-4">
            <Invoices returnedCode={(value: string) => handleReturnedCode(value)}></Invoices>
        </section>
    )
}