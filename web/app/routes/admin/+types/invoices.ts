import type { createRoute } from "@react-router/dev";
import type { clientLoader } from "../admin/invoices";

export type Route = ReturnType<
  typeof createRoute<{
    loader: typeof clientLoader;
  }>
>;
