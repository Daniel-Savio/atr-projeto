import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    layout("components/header.tsx", [
        ...prefix("comanda", [
            index("routes/open-comanda.tsx"),
            route(":comandaNumber", "routes/edit-comanda.tsx"),
        ]),
        route("pagamento", "routes/pagamento.tsx"),
        route("admin", "routes/admin.tsx"),
    ])
] satisfies RouteConfig;