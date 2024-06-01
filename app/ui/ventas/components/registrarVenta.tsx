import React from "react";
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print"

type Producto = {
    key: number;
    nombre: string;
    cantidad: number;
    precio_unitario: number;
    importe: number;
};

type Venta = {
    cliente: string;
    celular_cliente?: string;
    direccion_cliente?: string;
    fecha_registro: string;
    metodo_pago: number;
    fecha_boleta: string;
    metodo_entrega: number;
    total_venta: number;
    productos: Producto[];
}

export function RegistrarVenta({ registrarVenta }: { registrarVenta: Venta }) {
    const imprimirBoletaRef = React.useRef<HTMLElement>(null);
    const [confirmarVenta, setConfirmarVenta] = React.useState<boolean>(false);

    const handlePrint = useReactToPrint({
        content: () => imprimirBoletaRef.current,
    });

    const confirmar = () => {
        handlePrint();
        setConfirmarVenta(true);
    }

    return (
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col text-center uppercase border-b-1 font-bold border-gray-400 text-xl">
                        {confirmarVenta ? (
                            <h2>
                                Venta Registrada
                            </h2>
                        ) : (
                            <h2>
                                ¿Confirmar registro de venta?
                            </h2>
                        )}
                    </ModalHeader>
                    <ModalBody className="py-5 text-xs">
                        <div
                            style={{
                                boxShadow: confirmarVenta ? "rgb(23 201 100) 0px 0px 15px 0px, rgb(23 201 100) 0px 0px 15px 0px" : "rgb(0 111 238) 0px 0px 15px 0px, rgb(0 111 238) 0px 0px 15px 0px",
                                fontFamily: "Arial, Helvetica, sans-serif"
                            }}
                        >
                            <article
                                ref={imprimirBoletaRef}
                                className="flex flex-col max-w-md bg-white px-5 py-10 gap-4"
                            >
                                <ul className="text-center uppercase tracking-widest leading-4">
                                    <li>Bodega la esquinita</li>
                                    <li>R.U.C. 10424720891</li>
                                    <li>Asoc. Villa Cristo Rey Mz. 15 - Lt. 1, C.P.M. Leguía, Tacna - Tacna - Tacna</li>
                                    <li>Teléfono (052) 314148</li>
                                    <li className="py-1">
                                        <h3 className="text-base font-bold uppercase tracking-normal">Boleta de Venta electrónica</h3>
                                        <p className="text-sm tracking-widest -mt-1">N° 001-001814</p>
                                    </li>
                                </ul>
                                <section>
                                    <div className="grid grid-cols-2">
                                        <p className="font-semibold flex justify-between">Cliente<span>:</span></p>
                                        <p className="text-end uppercase">{registrarVenta.cliente}</p>
                                    </div>
                                    {registrarVenta.celular_cliente && (
                                        <div className="grid grid-cols-2">
                                            <p className="font-semibold flex justify-between">Celular<span>:</span></p>
                                            <p className="text-end">{registrarVenta.celular_cliente}</p>
                                        </div>
                                    )}
                                    {registrarVenta.direccion_cliente && (
                                        <div className="grid grid-cols-2">
                                            <p className="font-semibold flex justify-between">Dirección<span>:</span></p>
                                            <p className="text-end uppercase">{registrarVenta.direccion_cliente}</p>
                                        </div>
                                    )}
                                    {registrarVenta.fecha_boleta && (
                                        <React.Fragment>
                                            <div className="grid grid-cols-2">
                                                <p className="font-semibold flex justify-between">Fecha de Emisión<span>:</span></p>
                                                <p className="text-end">{registrarVenta.fecha_boleta.split(' ')[0]}</p>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <p className="font-semibold flex justify-between">Hora de Emisión<span>:</span></p>
                                                <p className="text-end">{registrarVenta.fecha_boleta.split(' ')[1]}</p>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </section>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 pr-0.5 border-b-2 border-gray-300">Cant.</th>
                                            <th className="py-2 pr-0.5 text-start border-b-2 border-gray-300">Descripción</th>
                                            <th className="py-2 pr-0.5 border-b-2 border-gray-300">P. Unit</th>
                                            <th className="py-2 border-b-2 border-gray-300">Importe</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {registrarVenta.productos.map((producto) => (
                                            <tr key={producto.key}>
                                                <td className="pr-0.5 text-center border-b border-gray-300">{producto.cantidad}</td>
                                                <td className="pr-0.5 border-b border-gray-300">{producto.nombre}</td>
                                                <td className="pr-0.5 text-center border-b border-gray-300">{producto.precio_unitario.toFixed(2)}</td>
                                                <td className="text-center border-b border-gray-300">{producto.importe.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="text-right mt-4">
                                    <span className="font-semibold">Total Venta: </span> S/. {registrarVenta.total_venta.toFixed(2)} PEN
                                </div>
                                <div className="text-center mt-4">
                                    GRACIAS POR SU COMPRA
                                </div>
                            </article>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t-1 border-gray-400">
                        {confirmarVenta ? (
                            <div className="flex justify-between w-full">
                                <div className="flex gap-2">
                                    <Button className="font-bold" variant="flat" color="secondary" onPress={onClose}>
                                        Descargar
                                    </Button>
                                    <Button className="font-bold" variant="flat" color="primary" onPress={handlePrint}>
                                        Imprimir
                                    </Button>
                                </div>
                                <div>
                                    <Button className="font-bold" color="secondary" onPress={onClose}>
                                        Finalizar
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <React.Fragment>
                                <Button className="font-bold" variant="flat" color="success" onPress={confirmar}>
                                    Confirmar
                                </Button>
                                <Button className="font-bold" color="danger" onPress={onClose}>
                                    Cancelar
                                </Button>
                            </React.Fragment>
                        )}
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    );
}
