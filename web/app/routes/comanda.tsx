import React, { useState, useEffect, useRef } from "react";
import {QRcodeScanner} from "../components/qr-code-scanner";
import { Scanner, type IDetectedBarcode } from "@yudiel/react-qr-scanner";
export default function Comanda() {
  const [code, setCode] = useState<IDetectedBarcode>();


  return (
    <div className="container mx-auto p-4">
     <QRcodeScanner returnedCode={(value) => setCode(value)}/>
      <div className="mt-4">
        {code && <p>Scanned Code: {code.rawValue}</p>}
      </div>
    </div>
  );
}
