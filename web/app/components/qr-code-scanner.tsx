
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { QrCode } from "lucide-react";
import type { IDetectedBarcode } from "@yudiel/react-qr-scanner"

import { Scanner } from "@yudiel/react-qr-scanner"

interface Props {
    returnedCode: (value: IDetectedBarcode) => void,
}
export function QRcodeScanner(props: Props) {



    function handleValue(result: IDetectedBarcode | null) {
        console.log('Detected codes:', result);
        if (result) {
            props.returnedCode(result);

        }
    }

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button size={"lg"} >Ler QR Code</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Escaneie o QR Code</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <Scanner
                            onScan={(result) => handleValue(result[0])}
                            onError={(error) => console.log(error)}
                        ></Scanner>

                    </DialogDescription>

                    <DialogFooter>

                        <DialogClose asChild>
                            <Button variant="destructive">Cancelar</Button>
                        </DialogClose>

                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
