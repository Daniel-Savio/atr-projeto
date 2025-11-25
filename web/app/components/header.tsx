import {
  Home,
  CreditCard,
  Shield,
  QrCode,
} from "lucide-react";
import { Link, Outlet } from "react-router";

export default function Header() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
      <header className="fixed bottom-0 md:relative flex w-full justify-center items-center">
        <div className="p-4 flex w-full justify-around items-center bg-zinc-900 text-zinc-50 rounded-t-lg md:rounded-b-lg md:rounded-t-none shadow-up">
          <nav>
            <ul className="flex justify-around items-center space-x-4">
              <li>
                <Link
                  to="/"
                  className="flex flex-col items-center text-zinc-400 [&.active]:text-zinc-50"
                >
                  <Home className="h-6 w-6" />
                  <span className="text-xs">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/pagamento"
                  className="flex flex-col items-center text-zinc-400 [&.active]:text-zinc-50"
                >
                  <CreditCard className="h-6 w-6" />
                  <span className="text-xs">Pagamento</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin"
                  className="flex flex-col items-center text-zinc-400 [&.active]:text-zinc-50"
                >
                  <Shield className="h-6 w-6" />
                  <span className="text-xs">Admin</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/comanda"
                  className="flex flex-col items-center text-zinc-400 [&.active]:text-zinc-50"
                >
                  <QrCode className="h-6 w-6" />
                  <span className="text-xs">Comanda</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="h-16 md:hidden"></div>
    </div>
  );
}
