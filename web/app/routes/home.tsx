import type { Route } from "./+types/home";
import logo from "../assets/logo.png";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import { ChevronRight } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Coração Gaucho" },
    { name: "description", content: "Bem vindo ao restaurante Coração Gaucho" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[300px] max-w-[100vw] p-4">
            <img
              src={logo}
              alt="React Router"
              className="block w-full dark:hidden "
            />
          </div>
        </header>

        <div className="max-w-[300px] w-full space-y-6 px-4">
   
            <ul className="space-y-8">
              <li className="w-full flex items-center justify-center">
                <Link to={"/comanda"}><Button className="w-md h-12 flex justify-center shadow-md items-center">Comanda <ChevronRight className="size-6"/></Button></Link>
              </li>
              <li className="w-full flex items-center justify-center">
                <Link to={"/pagamento"}><Button className="w-md h-12 flex justify-center shadow-md items-center">Pagamento <ChevronRight className="size-6"/></Button></Link>
              </li>
              <li className="w-full flex items-center justify-center">
                <Link to={"/admin"}><Button className="w-md h-12 flex justify-center shadow-md  items-center">Admin <ChevronRight className="size-6"/></Button></Link>
              </li>
            </ul>
   
        </div>
      </div>
    </main>
  );
}

