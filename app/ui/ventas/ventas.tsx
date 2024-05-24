"use client";
import React from "react";
import { Select, SelectItem, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, DatePicker, getKeyValue, useDisclosure } from "@nextui-org/react";
import { DeleteIcon } from "../components/DeleteIcon";
import { getLocalTimeZone, now } from "@internationalized/date";
import BuscarProducto from "./components/buscarProducto";

export default function ContentVentas() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const rows = [
        {
            key: 1,
            cantidad: 5,
            producto: "Producto 1",
            precio_unitario: 10.50,
            importe: 52.50,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
        {
            key: 2,
            cantidad: 3,
            producto: "Producto 2",
            precio_unitario: 7.25,
            importe: 21.75,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        }
    ];

    const columns = [
        {
            key: "cantidad",
            label: "CANTIDAD",
        },
        {
            key: "producto",
            label: "PRODUCTO",
        },
        {
            key: "precio_unitario",
            label: "P. UNIT",
        },
        {
            key: "importe",
            label: "IMPORTE",
        },
        {
            key: "eliminar",
            label:
                <span className="text-lg">
                    <DeleteIcon />
                </span>,
        }
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
        <React.Fragment>
            <BuscarProducto isOpen={isOpen} onOpenChange={onOpenChange} />
            <section className="flex flex-col bg-white rounded-md">
                <header className="bg-pink-500 p-4 rounded-tl-md rounded-tr-md ">
                    <h2 className="text-white font-bold uppercase">Registro de ventas</h2>
                </header>
                <article className="flex flex-col gap-4 p-4">
                    <section className="flex flex-col lg:flex-row gap-4 lg:items-start">
                        <Input
                            isRequired
                            isReadOnly
                            type="text"
                            size="sm"
                            label="Producto"
                            placeholder="Seleciona un producto"
                            onClick={onOpen}
                        />
                        <Input
                            isRequired
                            type="number"
                            size="sm"
                            label="Cantidad"
                            placeholder="Ingresa la cantidad"
                        />
                        <Input
                            isReadOnly
                            type="number"
                            label="Precio unitario"
                            color="primary"
                            placeholder="0.00"
                            size="sm"
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
                            <TableHeader columns={columns}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody emptyContent={"No se agregó ningún producto."} items={rows}>
                                {(item) => (
                                    <TableRow key={item.key}>
                                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
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
                                    placeholder="Ingresa el nombre del Cliente"
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
                            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                                <Input
                                    isRequired
                                    type="text"
                                    label="Dirección"
                                    className="md:col-span-4"
                                    placeholder="Ingresa la dirección del Cliente"
                                />
                                <Input
                                    isRequired
                                    type="number"
                                    label="Celular"
                                    className="md:col-span-3"
                                    placeholder="Ingresa el número del Cliente"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 xl:col-span-1">
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
                            <Input
                                isRequired
                                type="number"
                                label="Celular"
                                className="md:col-span-3"
                                placeholder="Ingresa el número del Cliente"
                            />
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
        </React.Fragment>
    );
}
