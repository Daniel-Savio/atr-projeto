import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    layout("components/header.tsx", [
        route("comanda", "routes/comanda.tsx"),
        route("pagamento", "routes/pagamento.tsx"),
        route("admin", "routes/admin.tsx"),
    ])
] satisfies RouteConfig;