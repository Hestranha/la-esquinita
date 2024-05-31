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
                    <ModalHeader className="flex flex-col gap-1 text-center uppercase border-b-1 border-gray-400">¿Deseas continuar con el registro de la venta?</ModalHeader>
                    <ModalBody className="py-5">
                        <div className="bg-white p-5 rounded-lg shadow-lg max-w-md mx-auto">
                            <h2 className="text-xl font-bold mb-4">Boleta de Venta</h2>
                            <div className="mb-2">
                                <span className="font-semibold">Cliente:</span> {registrarVenta.cliente}
                            </div>
                            {registrarVenta.celular_cliente && (
                                <div className="mb-2">
                                    <span className="font-semibold">Celular:</span> {registrarVenta.celular_cliente}
                                </div>
                            )}
                            {registrarVenta.direccion_cliente && (
                                <div className="mb-2">
                                    <span className="font-semibold">Dirección:</span> {registrarVenta.direccion_cliente}
                                </div>
                            )}
                            {registrarVenta.fecha_boleta && (
                                <div className="mb-2">
                                    <span className="font-semibold">Fecha de Emisión:</span> {registrarVenta.fecha_boleta}
                                </div>
                            )}
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
                                <span className="font-semibold">Total Venta: </span> S/. {registrarVenta.total_venta.toFixed(2)}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t-1 border-gray-400">
                        <Button color="danger" variant="light" onPress={onClose}>
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
