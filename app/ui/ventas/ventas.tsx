"use client";
import React, { ChangeEvent } from "react";
import { Input, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, DatePicker, getKeyValue, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { DeleteIcon } from "../components/DeleteIcon";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useBuscarProducto } from "./components/buscarProducto";
import { useAsyncList } from "@react-stately/data";

type SWCharacter = {
    name: string;
    precio_unitario: number;
};

type Producto = {
    key: number;
    nombre: string;
    cantidad: number;
    precio_unitario: number;
    importe: number;
};

export default function ContentVentas() {
    const [valueCantidad, setValueCantidad] = React.useState("1");
    const [importe, setImporte] = React.useState("0.00");
    const [selectedName, setSelectedName] = React.useState("");
    const [selectedPrecioUnitario, setSelectedPrecioUnitario] = React.useState("0.00");
    const [productosSeleccionados, setProductosSeleccionados] = React.useState<Producto[]>([]);
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useEffect(() => {
        const calcularImporte = (): string => {
            if (valueCantidad) {
                const cantidad = Number(valueCantidad);
                if (cantidad >= 0 && cantidad <= 1000) {
                    const nuevoImporte = cantidad * parseFloat(selectedPrecioUnitario);
                    return nuevoImporte.toFixed(2).toString();
                }
            }
            return "0.00";
        };

        const nuevoImporte = calcularImporte();
        setImporte(nuevoImporte);
    }, [valueCantidad, selectedPrecioUnitario]);

    const handleValueCantidadChange = (value: string) => {
        if (Number(value) > 0 && Number(value) <= 1000) {
            setValueCantidad(value);
        } else {
            setValueCantidad("");
        }
    };

    const handleValueProductoChange = (key: string | number | null) => {
        const selectedProduct = list.items.find((item) => item.name === key);
        if (selectedProduct) {
            setSelectedName(selectedProduct.name);
            setSelectedPrecioUnitario(selectedProduct.precio_unitario.toString());
        }
    };

    const agregarProducto = () => {
        if (formRef.current?.reportValidity()) {
            const nuevoProducto: Producto = {
                key: productosSeleccionados.length + 1,
                nombre: selectedName,
                cantidad: Number(valueCantidad),
                precio_unitario: parseFloat(selectedPrecioUnitario),
                importe: parseFloat(importe),
            };
            const nuevosProductos = [...productosSeleccionados, nuevoProducto];
            setProductosSeleccionados(nuevosProductos);
            list.setFilterText("");
            setSelectedName("");
            setSelectedPrecioUnitario("0.00");
            setImporte("0.00");
        }
    };

    const eliminarProducto = (key: number) => {
        setProductosSeleccionados(prevProductos => {
            const nuevoArray = prevProductos.filter(objeto => objeto.key !== key);
            return nuevoArray;
        });
    };

    const columns = [
        {
            key: "producto",
            label: "PRODUCTO",
        },
        {
            key: "cantidad",
            label: "CANTIDAD",
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

    let list = useAsyncList<SWCharacter>({
        async load({ signal, filterText }) {
            let res = await fetch(`/api/ventas/buscarProducto?search=${filterText}`, { signal });
            let json = await res.json();

            return {
                items: json.results,
            };
        },
    });

    return (
        <React.Fragment>
            <section className="flex flex-col bg-white rounded-md">
                <header className="bg-pink-500 p-4 rounded-tl-md rounded-tr-md ">
                    <h2 className="text-white font-bold uppercase">Registro de ventas</h2>
                </header>
                <article className="flex flex-col gap-4 p-4">
                    <form ref={formRef} className="flex flex-col xl:grid xl:grid-cols-7 gap-4">
                        <div className="xl:col-span-3">
                            <Autocomplete
                                isRequired
                                inputValue={list.filterText}
                                isLoading={list.isLoading}
                                items={list.items}
                                placeholder="Busca un producto"
                                label="Producto"
                                size="sm"
                                onInputChange={(value) => {
                                    list.setFilterText(value);
                                    if (value === "") {
                                        setSelectedName("");
                                        setSelectedPrecioUnitario("0.00");
                                    }
                                }}
                                onSelectionChange={handleValueProductoChange}
                            >
                                {(item) => (
                                    <AutocompleteItem
                                        key={item.name}
                                        textValue={item.name}
                                    >
                                        {item.name}
                                    </AutocompleteItem>
                                )}
                            </Autocomplete>
                        </div>
                        <div className="flex flex-col xl:grid gap-4 xl:grid-cols-3 xl:col-span-3">
                            <div className="xl:col-span-1">
                                <Input
                                    isRequired
                                    type="number"
                                    size="sm"
                                    label="Cantidad"
                                    placeholder="Ingresa la cantidad"
                                    value={valueCantidad}
                                    onValueChange={handleValueCantidadChange}
                                />
                            </div>
                            <div className="flex flex-row gap-4 xl:grid xl:grid-cols-2 xl:col-span-2">
                                <Input
                                    isReadOnly
                                    type="text"
                                    label="Precio unitario"
                                    color="primary"
                                    placeholder="0.00"
                                    size="sm"
                                    className="xl:col-span-1"
                                    value={selectedPrecioUnitario.toString()}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">S/.</span>
                                        </div>
                                    }
                                />
                                <Input
                                    isReadOnly
                                    type="text"
                                    label="Importe"
                                    color="secondary"
                                    placeholder="0.00"
                                    size="sm"
                                    className="xl:col-span-1"
                                    value={importe}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">S/.</span>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        <Button color="danger" className="xl:col-span-1 font-bold" size="lg" onClick={agregarProducto}>
                            Agregar
                        </Button>
                    </form>
                    <section className="">
                        <Table aria-label="Tabla de productos a comprar">
                            <TableHeader columns={columns}>
                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody emptyContent={"No se agregó ningún producto."} items={productosSeleccionados}>
                                {(itemProducto) => (
                                    <TableRow key={itemProducto.key}>
                                        <TableCell>{itemProducto.nombre}</TableCell>
                                        <TableCell>{itemProducto.cantidad}</TableCell>
                                        <TableCell>{itemProducto.precio_unitario}</TableCell>
                                        <TableCell>{itemProducto.importe}</TableCell>
                                        <TableCell>
                                            <span className="text-lg text-danger cursor-pointer active:opacity-50" onClick={() => eliminarProducto(itemProducto.key)}>
                                                <DeleteIcon />
                                            </span>
                                        </TableCell>
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
                                    size="sm"
                                    type="text"
                                    label="Cliente"
                                    placeholder="Ingresa el nombre del Cliente"
                                />
                                <Select
                                    isRequired
                                    size="sm"
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
                                    size="sm"
                                    label="Dirección"
                                    className="md:col-span-4"
                                    placeholder="Ingresa la dirección del Cliente"
                                />
                                <Input
                                    isRequired
                                    type="number"
                                    size="sm"
                                    label="Celular"
                                    className="md:col-span-3"
                                    placeholder="Ingresa el número del Cliente"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 xl:col-span-1">
                            <Select
                                isRequired
                                size="sm"
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
                                size="sm"
                                label="Celular"
                                className="md:col-span-3"
                                placeholder="Ingresa el número del Cliente"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row xl:flex-col gap-4 xl:col-span-1">
                            <DatePicker
                                isReadOnly
                                label="Fecha"
                                size="sm"
                                hideTimeZone
                                color="primary"
                                showMonthAndYearPickers
                                defaultValue={now(getLocalTimeZone())}
                            />
                            <Input
                                isReadOnly
                                type="number"
                                label="Total"
                                size="sm"
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
                        <Button className="font-bold" color="warning" size="lg">
                            Cancelar Venta
                        </Button>
                        <Button className="font-bold" color="success" size="lg">
                            Registrar Venta
                        </Button>
                    </section>
                </article>
            </section>
        </React.Fragment>
    );
}
