"use client";
import React from "react";
import { Select, SelectItem, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, DatePicker } from "@nextui-org/react";
import { DeleteIcon } from "./components/DeleteIcon";
import { getLocalTimeZone, now } from "@internationalized/date";

export default function ContentVentas() {
    const animals = [
        { value: 1, label: "Perro" },
        { value: 2, label: "Gato" },
        { value: 3, label: "Pájaro" },
        { value: 4, label: "Conejo" },
        { value: 5, label: "Hamster" },
        { value: 6, label: "Perro" },
        { value: 7, label: "Gato" },
        { value: 8, label: "Pájaro" },
        { value: 9, label: "Conejo" },
        { value: 10, label: "Perro" },
        { value: 11, label: "Gato" },
        { value: 12, label: "Pájaro" },
        { value: 13, label: "Conejo" },
        { value: 14, label: "Perro" },
        { value: 15, label: "Gato" },
        { value: 16, label: "Pájaro" },
    ];
    const metodosPago = [
        { value: 1, label: "Efectivo" },
        { value: 2, label: "Yape" },
        { value: 3, label: "Otros" }
    ];
    const metodosEntrega = [
        { value: 1, label: "En Tienda" },
        { value: 2, label: "Envío" },
        { value: 3, label: "Otros" }
    ];

    return (
        <section className="flex flex-col bg-white rounded-md">
            <header className="bg-pink-500 p-4 rounded-tl-md rounded-tr-md ">
                <h2 className="text-white font-bold">Registro de ventas</h2>
            </header>
            <article className="flex flex-col gap-4 p-4">
                <section className="flex flex-col lg:flex-row gap-4 lg:items-center">
                    <Select
                        isRequired
                        items={animals}
                        label="Producto"
                        placeholder="Selecciona un producto"
                    >
                        {(animal: { value: number, label: string }) => (
                            <SelectItem key={animal.value}>{animal.label}</SelectItem>
                        )}
                    </Select>
                    <Input isRequired type="number" label="Cantidad" placeholder="Ingrese la cantidad" />
                    <Input
                        isReadOnly
                        type="number"
                        label="Precio unitario"
                        color="primary"
                        placeholder="0.00"
                        endContent={
                            <div className="pointer-events-none flex items-center">
                                <span className="text-default-400 text-small">S/.</span>
                            </div>
                        }
                    />
                    <Button color="danger" size="lg">
                        Agregar
                    </Button>
                </section>
                <section className="">
                    <Table aria-label="Example empty table">
                        <TableHeader>
                            <TableColumn>CANTIDAD</TableColumn>
                            <TableColumn>PRODUCTO</TableColumn>
                            <TableColumn>P. UNIT.</TableColumn>
                            <TableColumn>IMPORTE</TableColumn>
                            <TableColumn>
                                <span className="text-lg text-danger">
                                    <DeleteIcon />
                                </span>
                            </TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No se agregó ningún producto."}>{[]}
                            {/* <div className="relative flex items-center gap-2">
                            <Tooltip color="danger" content="Eliminar">
                                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                    <DeleteIcon />
                                </span>
                            </Tooltip>
                        </div> */}
                        </TableBody>
                    </Table>
                </section>
                <section className="flex flex-col xl:grid xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                    <div className="flex flex-col gap-4 xl:col-span-2 2xl:col-span-3">
                        <div className="flex flex-col md:flex-row gap-4">
                            <Input
                                isRequired
                                type="text"
                                label="Cliente"
                                placeholder="Ingrese el nombre del Cliente"
                            />
                            <Select
                                isRequired
                                label="Método de Entrega"
                                placeholder="Selecciona el método de entrega"
                                defaultSelectedKeys={[1]}
                            >
                                {metodosEntrega.map((opcion: { value: number, label: string }) => (
                                    <SelectItem key={opcion.value} value={opcion.value}>{opcion.label}</SelectItem>
                                ))}
                            </Select>

                        </div>
                        <Input
                            isRequired
                            type="text"
                            label="Dirección"
                            placeholder="Ingrese la dirección del Cliente"
                        />
                    </div>
                    <div className="xl:col-span-1">
                        <Select
                            isRequired
                            items={metodosPago}
                            label="Método de pago"
                            placeholder="Selecciona el método pago"
                        >
                            {(animal: { value: number, label: string }) => (
                                <SelectItem key={animal.value}>{animal.label}</SelectItem>
                            )}
                        </Select>
                    </div>
                    <div className="flex flex-col md:flex-row xl:flex-col gap-4 xl:col-span-1">
                        <DatePicker
                            isReadOnly
                            label="Fecha"
                            hideTimeZone
                            color="primary"
                            showMonthAndYearPickers
                            defaultValue={now(getLocalTimeZone())}
                        />
                        <Input
                            isReadOnly
                            type="number"
                            label="Total"
                            color="success"
                            placeholder="0.00"
                            endContent={
                                <div className="pointer-events-none flex items-center">
                                    <span className="text-default-400 text-small">S/.</span>
                                </div>
                            }
                        />
                    </div>
                </section>
                <section className="flex flex-col lg:flex-row gap-4 justify-end">
                    <Button color="warning" size="lg">
                        Cancelar Venta
                    </Button>
                    <Button color="success" size="lg">
                        Registrar Venta
                    </Button>
                </section>
            </article>
        </section>
    );
}
