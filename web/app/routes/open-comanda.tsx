import React, { useState, useEffect, useRef } from "react";
import { QRcodeScanner } from "../components/qr-code-scanner";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { Separator } from "~/components/ui/separator";
import { CornerLeftDown, CornerRightUp } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";
export default function Comanda() {
  const [code, setCode] = useState<IDetectedBarcode>();
  const [number, setNumber] = useState<string>("");
  const navigate = useNavigate();

  function handleQRcode(value: IDetectedBarcode) {
    setCode(value);

    navigate(`/comanda/${value.rawValue}`);
  }

  function handleNumber() {
    navigate(`/comanda/${number}`);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const allowedKeys = [
      "Backspace", "Delete", "Tab", "Escape", "Enter",
      "Home", "End", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"
    ];
  
    if (allowedKeys.includes(e.key)) {
      return;
    }
  
    // Allow Ctrl+A, C, V, X
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
      return;
    }
  
    // Block if not a digit
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }


  return (
    <main className="flex flex-col gap-2 justify-center items-center min-h-[86vh] mx-auto p-2">
      <h1 className="text-2xl font-extrabold mb-15">Abrir Comanda</h1>
      <section>
        <form className="flex flex-col justify-center gap-8" onSubmit={(e) => { e.preventDefault(); handleNumber(); }}>
          <div className="flex flex-col gap-2">
            <Label>Insira o número da comanda</Label>
            <Input
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                setNumber(numericValue);
              }}
              value={number}
              className="h-12 bg-zinc-50"
              type="number"
              min={0}
            ></Input>
          </div>

          <Button size={"lg"} type="submit">Abrir comanda</Button>

        </form>
      </section>

      <div className="flex flex-col max-w-screen w-full items-center my-4">
        <span className="flex gap-2 text-sm text-muted-foreground mb-2 items-baseline ">
          <p>Insira manualmente </p>
          <CornerRightUp size={16} />
        </span>
        <Separator />
        <span className="flex flex-row-reverse gap-2 text-sm text-muted-foreground mt-2 items-baseline ">
          <p>Escaneie um QR Code </p>
          <CornerLeftDown size={16} />
        </span>
      </div>
      <section>
        <QRcodeScanner returnedCode={(value) => handleQRcode(value)} />
        <div className="mt-4">
          {code && <p>Scanned Code: {code.rawValue}</p>}
        </div>
      </section>
    </main>
  );
}
