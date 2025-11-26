import type { Order } from "types";
import { useState } from "react";
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
  const [visibleColumns, setVisibleColumns] = useState({
    status: true,
    data: true,
    total: true,
  });

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const totalAmount = orders.reduce((acc, order) => acc + parseFloat(order.total!), 0);

  return (
    <div className="w-full">
      <h1 className="text-center mb-2">Esconder colunas</h1>
      <section className="flex gap 2 justify-around mb-5">
        <Button variant="default" onClick={() => toggleColumn('status')}><Activity /></Button>
         <Button variant="default" onClick={() => toggleColumn('data')}><Calendar /></Button>
         <Button variant="default" onClick={() => toggleColumn('total')}><Banknote /></Button>
      </section>
      <Table className="transition-all">
        <TableHeader className="border-b-2 border-zinc-700">
          <TableRow className="bg-zinc-100">
            <TableHead>#</TableHead>
            <TableHead className="transition-all" style={{ display: visibleColumns.status ? 'table-cell' : 'none' }}>
              <Button variant="ghost" onClick={() => toggleColumn('status')}><Activity /></Button>
            </TableHead>
            <TableHead className="transition-all" style={{ display: visibleColumns.data ? 'table-cell' : 'none' }}>
              <Button variant="ghost" onClick={() => toggleColumn('data')}><Calendar /></Button>
            </TableHead>
            <TableHead className="transition-all flex justify-end" style={{ display: visibleColumns.total ? 'table-cell' : 'none' }}>
              <TableCell><Button variant="ghost" onClick={() => toggleColumn('total')}><Banknote /></Button></TableCell>
            </TableHead >
            <TableHead><TableCell>#</TableCell></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {orders.map((order) => (
            <TableRow key={order.id} className="border-b border-zinc-600 w-fit">
              <TableCell className="font-medium">{order.number}</TableCell>
              <TableCell style={{ display: visibleColumns.status ? 'table-cell' : 'none' }}>
                <Badge className="text-xs w-fit h-fit" variant={order.status === "Open" ? "destructive" : "default"}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell style={{ display: visibleColumns.data ? 'table-cell' : 'none' }}>
                {new Date(order.date || "").toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right" style={{ display: visibleColumns.total ? 'table-cell' : 'none' }}>R$ {order.total}</TableCell>
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
                <TableCell>Total</TableCell>
                <TableCell style={{ display: visibleColumns.status ? 'table-cell' : 'none' }} />
                <TableCell style={{ display: visibleColumns.data ? 'table-cell' : 'none' }} />
                <TableCell className="text-right" style={{ display: visibleColumns.total ? 'table-cell' : 'none' }}>
                </TableCell>
                <TableCell className="text-right">
                    {totalAmount ? `${totalAmount.toFixed(2)} R$` : <Spinner />}
                </TableCell>
                <TableCell />
            </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
