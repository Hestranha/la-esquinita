"use client";
import React from "react";
import { Select, SelectItem, Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, DatePicker, getKeyValue } from "@nextui-org/react";
import { DeleteIcon } from "../components/DeleteIcon";
import { getLocalTimeZone, now } from "@internationalized/date";

export default function ContentCompras() {
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
        },
        {
            key: 3,
            cantidad: 8,
            producto: "Producto 3",
            precio_unitario: 15.80,
            importe: 126.40,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
        {
            key: 4,
            cantidad: 2,
            producto: "Producto 4",
            precio_unitario: 20.00,
            importe: 40.00,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
        {
            key: 5,
            cantidad: 6,
            producto: "Producto 5",
            precio_unitario: 12.45,
            importe: 74.70,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
        {
            key: 6,
            cantidad: 4,
            producto: "Producto 6",
            precio_unitario: 9.99,
            importe: 39.96,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
        {
            key: 7,
            cantidad: 7,
            producto: "Producto 7",
            precio_unitario: 18.75,
            importe: 131.25,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
        {
            key: 8,
            cantidad: 1,
            producto: "Producto 8",
            precio_unitario: 25.50,
            importe: 25.50,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
        {
            key: 9,
            cantidad: 9,
            producto: "Producto 9",
            precio_unitario: 11.20,
            importe: 100.80,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
        {
            key: 10,
            cantidad: 3,
            producto: "Producto 10",
            precio_unitario: 14.75,
            importe: 44.25,
            eliminar:
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <DeleteIcon />
                </span>
        },
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
                <h2 className="text-white font-bold">Registro de compras</h2>
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
                    <Input isRequired type="number" label="Cantidad" placeholder="Ingresa la cantidad" />
                    <Input
                        isRequired
                        type="number"
                        label="Precio compra"
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
                    <div className="flex flex-col gap-4 xl:col-span-2">
                        <div className="flex flex-col md:flex-row gap-4">
                            <Input
                                isRequired
                                type="text"
                                label="Cliente"
                                placeholder="Ingresa el nombre del Cliente"
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                type="file"
                                label="Foto de Factura"
                                placeholder="Suba la foto de la Factura"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4 xl:col-span-1 2xl:col-span-2">
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
                    <div className="flex flex-col sm:flex-row xl:flex-col gap-4 xl:col-span-1">
                        <DatePicker
                            isRequired
                            label="Fecha"
                            hideTimeZone
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
                        Cancelar Compra
                    </Button>
                    <Button color="secondary" size="lg">
                        Borrador Compra
                    </Button>
                    <Button color="success" size="lg">
                        Registrar Compra
                    </Button>
                </section>
            </article>
        </section>
    );
}
