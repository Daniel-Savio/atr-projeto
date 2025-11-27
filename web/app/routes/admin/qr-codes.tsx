import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Input } from "~/components/ui/input";
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import logo from "~/assets/logo.png";


export default function AdminQrCodes() {
  const [inputValue, setInputValue] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleGenerate = () => {
    setQrCodeValue(inputValue);
  };


  // ... (rest of the component)

  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas");
      const h2 = qrRef.current.querySelector("h2");

      if (canvas && h2) {
        const logoImg = new Image();
        logoImg.src = logo;
        logoImg.onload = () => {
          const newCanvas = document.createElement("canvas");
          const context = newCanvas.getContext("2d");
          if (!context) return;

          const h2Style = window.getComputedStyle(h2);
          const originalFontSize = parseInt(h2Style.fontSize, 10);
          const newFontSize = originalFontSize * 5;
          const font = `${h2Style.fontWeight} ${newFontSize}px ${h2Style.fontFamily}`;
          context.font = font;

          const textWidth = context.measureText(h2.innerText).width;
          const logoWidth = 200;
          const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
          const canvasWidth = Math.max(textWidth, canvas.width, logoWidth) + 40;
          const canvasHeight = canvas.height + newFontSize + logoHeight + 60;

          newCanvas.width = canvasWidth;
          newCanvas.height = canvasHeight;

          context.fillStyle = "white";
          context.fillRect(0, 0, newCanvas.width, newCanvas.height);

          // need to set the font again after resizing the canvas
          context.font = font;
          context.fillStyle = h2Style.color;
          context.textAlign = "center";
          context.fillText(h2.innerText, canvasWidth / 2, newFontSize);
          context.drawImage(canvas, (canvasWidth - canvas.width) / 2, newFontSize + 20);
          context.drawImage(
            logoImg,
            (canvasWidth - logoWidth) / 2,
            newFontSize + canvas.height + 40,
            logoWidth,
            logoHeight
          );

          const link = document.createElement("a");
          link.download = `qr-code-${qrCodeValue}.png`;
          link.href = newCanvas.toDataURL("image/png");
          link.click();
        };
      }
    }
  };

  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4 min-h-[86vh]">
      <h1 className="text-3xl font-bold mb-8">Gerador de QR Code</h1>
      <div className="w-full max-w-96 border rounded-lg p-4 text-center bg-zinc-50">
        <p className="mb-4">Insira o número da comanda:</p>
        <Input
          type="number"
          className="p-2 border rounded-md w-full"
          placeholder="Ex: 123"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button className="mt-4" onClick={handleGenerate}>
          Gerar QR Code
        </Button>
      </div>
      {qrCodeValue && (
        <div className="mt-8 flex flex-col items-center gap-4" ref={qrRef}>
          <h2 className="text-2xl font-bold">{qrCodeValue}</h2>
          <QRCodeCanvas className="shadow-lg" value={qrCodeValue} size={256} />
          <Button
            className="flex gap-2 items-center"
            onClick={handleDownload}
          >
            <Download /> Baixar QR Code
          </Button>
        </div>
      )}
      <div className="mt-8">

        <Button className="flex gap-2 items-center" onClick={() => { navigate(-1) }}>
          <ArrowLeft /> Voltar
        </Button>

      </div>
    </main>
  );
}
