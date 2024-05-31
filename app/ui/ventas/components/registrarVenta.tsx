import React from "react";
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

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
    return (
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col text-center uppercase border-b-1 font-bold border-gray-400 text-xl">
                        ¿Confirmar registro de venta?
                    </ModalHeader>
                    <ModalBody className="py-5 text-sm">
                        <article
                            className="flex flex-col bg-white p-5 rounded-lg max-w-md mx-auto gap-4"
                            style={{ boxShadow: "0 0 15px 0 rgba(0, 0, 0, 0.1), 0 0 15px 0 rgba(0, 0, 0, 0.1)" }}
                        >
                            <ul className="text-center uppercase tracking-widest leading-4">
                                <li>Bodega la esquinita</li>
                                <li>R.U.C. 10424720891</li>
                                <li>Asoc. Villa Cristo Rey Mz. 15 - Lt. 1, C.P.M. Leguía, Tacna - Tacna - Tacna</li>
                                <li>Teléfono (052) 314148</li>
                                <li className="py-1">
                                    <h3 className="text-lg font-bold uppercase tracking-normal">Boleta de Venta electrónica</h3>
                                    <p className="text-base tracking-widest -mt-1">N° 001-001814</p>
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
                                        <th className="py-2 border-b-2 border-gray-300">Cant.</th>
                                        <th className="py-2 border-b-2 border-gray-300">Descripción</th>
                                        <th className="py-2 border-b-2 border-gray-300">P. Unit</th>
                                        <th className="py-2 border-b-2 border-gray-300">Importe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrarVenta.productos.map((producto) => (
                                        <tr key={producto.key}>
                                            <td className="text-center border-b border-gray-300">{producto.cantidad}</td>
                                            <td className="border-b border-gray-300">{producto.nombre}</td>
                                            <td className="text-center border-b border-gray-300">{producto.precio_unitario.toFixed(2)}</td>
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
                    </ModalBody>
                    <ModalFooter className="border-t-1 border-gray-400">
                        <Button className="font-bold" color="danger" onPress={onClose}>
                            Cancelar
                        </Button>
                        <Button className="font-bold" color="success" onPress={onClose}>
                            Confirmar
                        </Button>
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    );
}
