import { Link, Outlet } from "react-router";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <div className="">
      <header className="fixed bottom-0 md:relative flex w-full justify-center items-center">
        <div className="p-4 flex flex-col w-full justify-around items-center bg-zinc-900 text-zinc-50 rounded-t-lg md:rounded-b-lg md:rounded-t-none shadow-up">

          <nav className="text-2xl mb-2">
            <Link to="/" className="mr-4">
              Home
            </Link>
            <Link to="/comanda" className="mr-4">
              Comanda
            </Link>
            <Link to="/pagamento" className="mr-4">
              Pagamento
            </Link>
            <Link to="/admin">Admin</Link>
          </nav>

          <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <div className="h-28"></div>
    </div>
  );
}
