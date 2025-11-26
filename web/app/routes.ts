import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    layout("components/header.tsx", [
        ...prefix("comanda", [
            index("routes/open-comanda.tsx"),
            route(":comandaNumber", "routes/edit-comanda.tsx"),
        ]),
        ...prefix("pagamento", [
            index("routes/pagamento.tsx"),
            route(":id", "routes/payment-comanda.tsx"),
        ]),
        ...prefix("admin", [
            index("routes/admin/index.tsx"),
            route("invoices", "routes/admin/invoices.tsx"),
            route("qr-codes", "routes/admin/qr-codes.tsx"),
            route("reports", "routes/admin/reports.tsx"),
        ]),
    ])
] satisfies RouteConfig;