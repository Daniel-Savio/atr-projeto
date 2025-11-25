import type { Order } from "types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { MoreHorizontal, Trash2, Pencil, Check, Calendar, Banknote, TableOfContents, Activity } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Spinner } from "./ui/spinner";

interface InvoicesTableProps {
  orders: Order[];
  onEdit: (orderId: string) => void;
  onClose: (orderId: string) => void;
  onDelete: (orderId: string) => void;
}

export default function InvoicesTable({ orders, onEdit, onClose, onDelete }: InvoicesTableProps) {

  const totalAmount = orders.reduce((acc, order) => acc + parseFloat(order.total!), 0);
  return (
    <div className="w-full">
      <Table className="">
        <TableHeader className="border-b-2 border-zinc-700">
          <TableRow className="bg-zinc-100">
            <TableHead>#</TableHead>
            <TableHead><TableCell className="flex justify-start"><Activity /></TableCell></TableHead>
            <TableHead ><TableCell className="flex justify-start"><Calendar /></TableCell></TableHead>
            <TableHead ><TableCell className="flex justify-end"><Banknote /></TableCell></TableHead>
            <TableHead><TableCell className="flex justify-end"><TableOfContents /></TableCell></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {orders.map((order, index) => (
            <TableRow key={order.id} className="border-b border-zinc-600">
              <TableCell className="font-medium">{order.number}</TableCell>
              <TableCell>
                <Badge className="text-xs w-fit h-fit" variant={order.status === "Open" ? "destructive" : "default"}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(order.date || "").toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">R$ {order.total}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {order.status === 'Open' && (
                      <>
                        <DropdownMenuItem onClick={() => onEdit(order.id!)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onClose(order.id!)}>
                          <Check className="mr-2 h-4 w-4" />
                          <span>Fechar</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem
                      className="text-red-600 focus:bg-red-100 focus:text-red-700"
                      onClick={() => onDelete(order.id!)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Deletar</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">{ totalAmount ?  `${totalAmount.toFixed(2)} R$` : <Spinner />}</TableCell></TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
