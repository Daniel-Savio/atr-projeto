import type { createRoute } from "@react-router/dev";
import type { clientLoader } from "../pagamento";

export type Route = ReturnType<
  typeof createRoute<{
    loader: typeof clientLoader;
  }>
>;
