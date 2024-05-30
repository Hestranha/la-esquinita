"use client";
import React from "react";
import { Input, Select, SelectItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, DatePicker, getKeyValue, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { DeleteIcon } from "../components/DeleteIcon";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useAsyncList } from "@react-stately/data";

type SWCharacter = {
    id_producto: number;
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

type Venta = {
    cliente: string;
    celular_cliente?: string;
    direccion_cliente?: string;
    fecha_registro: Date;
    metodo_pago: number;
    fecha_boleta: Date;
    metodo_entrega: number;
    total_venta: number;
    productos: Producto[];
}

export default function ContentVentas() {
    const [metodosPago, setMetodosPago] = React.useState([]);
    const metodosEntrega = [
        { value: 1, label: "En Tienda" },
        { value: 2, label: "Envío" }
    ];

    const [idProducto, setSelectedIdProducto] = React.useState<number | null>(null);
    const [selectedName, setSelectedName] = React.useState("");
    const [valueCantidad, setValueCantidad] = React.useState("1");
    const [selectedPrecioUnitario, setSelectedPrecioUnitario] = React.useState("0.00");
    const [importe, setImporte] = React.useState("0.00");

    const [validName, setValidName] = React.useState(false);
    const [validCantidad, setValidCantidad] = React.useState(false);

    const [showDireccionCelular, setShowDireccionCelular] = React.useState(false);
    const [showCelular, setShowCelular] = React.useState(false);

    const [valueCliente, setValueCliente] = React.useState("");
    const [valueCelular, setValueCelular] = React.useState<number | null>(null);
    const [valueDireccion, setValueDireccion] = React.useState("");
    const [valueMetodoPago, setValueMetodoPago] = React.useState(1);
    const [valueMetodoEntrega, setValueMetodoEntrega] = React.useState(1);
    const [ventaTotal, setVentaTotal] = React.useState("0.00");
    const [productosSeleccionados, setProductosSeleccionados] = React.useState<Producto[]>([]);

    const [venta, setVenta] = React.useState<Venta[]>([]);

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

    React.useEffect(() => {
        let suma = 0;
        productosSeleccionados.forEach(producto => {
            suma += producto.importe;
        });
        setVentaTotal(suma.toFixed(2).toString());
    }, [productosSeleccionados]);


    const handleValueCantidadChange = (value: string) => {
        if (Number(value) > 0 && Number(value) <= 1000) {
            setValueCantidad(value);
            setValidCantidad(false);
        } else {
            setValueCantidad("");
        }
    };

    const handleValueProductoChange = (key: string | number | null) => {
        const selectedProduct = list.items.find((item) => item.name === key);
        if (selectedProduct) {
            setSelectedIdProducto(selectedProduct.id_producto);
            setSelectedName(selectedProduct.name);
            setSelectedPrecioUnitario(selectedProduct.precio_unitario.toString());
            setValidName(false);
        }
    };

    const agregarProducto = () => {
        if (selectedName === "") {
            setValidName(true);
            return;
        }
        if (!Number(valueCantidad)) {
            setValidCantidad(true);
            return;
        }
        const nuevoProducto: Producto = {
            key: idProducto || 0,
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
    };

    const eliminarProducto = (key: number) => {
        setProductosSeleccionados(prevProductos => {
            const nuevoArray = prevProductos.filter(objeto => objeto.key !== key);
            return nuevoArray;
        });
    };

    const [open, setOpen] = React.useState(false);
    const agregarVenta = () => {
        if (productosSeleccionados.length === 0) {
            setOpen(true);
            return;
        }
        const fechaActual = now(getLocalTimeZone());
        const nuevaVenta: Venta = {
            cliente: valueCliente,
            celular_cliente: valueCelular?.toString(),
            direccion_cliente: valueDireccion,
            fecha_registro: fechaActual.toDate(),
            metodo_pago: valueMetodoPago,
            fecha_boleta: fechaActual.toDate(),
            metodo_entrega: valueMetodoEntrega,
            total_venta: parseFloat(ventaTotal),
            productos: productosSeleccionados,
        };
        console.log(nuevaVenta);
        return;
    }

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

    React.useEffect(() => {
        fetchMetodosPago();
    }, []);

    const fetchMetodosPago = async () => {
        try {
            const response = await fetch("/api/ventas/metodosPago", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Error al obtener los métodos de pago");
            }

            const data = await response.json();
            setMetodosPago(data);
        } catch (error) {
            console.error("Error al obtener los métodos de pago:", error);
        }
    };

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
                    <form className="flex flex-col xl:grid xl:grid-cols-7 gap-4">
                        <div className="xl:col-span-3">
                            <Autocomplete
                                isRequired
                                isInvalid={validName}
                                errorMessage="Selecciona un producto válido"
                                inputValue={list.filterText}
                                isLoading={list.isLoading}
                                items={list.items}
                                placeholder="Busca un producto"
                                name="producto"
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
                                    isInvalid={validCantidad}
                                    errorMessage="Ingresa una cantidad válida"
                                    type="number"
                                    size="sm"
                                    label="Cantidad"
                                    name="cantidad"
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
                                    name="precio_unitario"
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
                                    name="importe"
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
                    <form className="flex flex-col gap-4" >
                        <div className="flex flex-col xl:grid xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                            <div className="flex flex-col gap-4 xl:col-span-2 2xl:col-span-3">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        isRequired
                                        size="sm"
                                        type="text"
                                        label="Cliente"
                                        placeholder="Ingresa el nombre del Cliente"
                                        value={valueCliente}
                                        onValueChange={setValueCliente}
                                    />
                                    <Select
                                        isRequired
                                        size="sm"
                                        label="Método de Entrega"
                                        placeholder="Selecciona el método de entrega"
                                        defaultSelectedKeys={["1"]}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            const value = e.target.value;
                                            if (value === "2") {
                                                setShowDireccionCelular(true);
                                            } else {
                                                setShowDireccionCelular(false);
                                            }
                                            setValueMetodoEntrega(Number(value));
                                        }}
                                    >
                                        {metodosEntrega.map((opcion: { value: number, label: string }) => (
                                            <SelectItem key={opcion.value} value={opcion.value}>{opcion.label}</SelectItem>
                                        ))}
                                    </Select>

                                </div>
                                {showDireccionCelular && (
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
                                )}
                            </div>
                            <div className="flex flex-col gap-4 xl:col-span-1">
                                <Select
                                    isRequired
                                    size="sm"
                                    items={metodosPago}
                                    label="Método de pago"
                                    placeholder="Selecciona el método pago"
                                    defaultSelectedKeys={["1"]}
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        const value = Number(e.target.value);
                                        const selectedMetodoPago = metodosPago.find((metodo) => (metodo as any).value === value);
                                        if (selectedMetodoPago) {
                                            if ((selectedMetodoPago as any).label === "Yape") {
                                                setShowCelular(true);
                                            } else {
                                                setShowCelular(false);
                                            }
                                            setValueMetodoEntrega((selectedMetodoPago as any).value);
                                        }
                                    }}
                                >
                                    {(animal: { value: number, label: string }) => (
                                        <SelectItem key={animal.value}>{animal.label}</SelectItem>
                                    )}
                                </Select>
                                {(showDireccionCelular == false && showCelular) && (
                                    <Input
                                        isRequired
                                        type="number"
                                        size="sm"
                                        label="Celular"
                                        className="md:col-span-3"
                                        placeholder="Ingresa el número del Cliente"
                                    />
                                )}
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
                                    type="text"
                                    label="Total"
                                    size="sm"
                                    color="success"
                                    placeholder="0.00"
                                    value={ventaTotal}
                                    endContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">S/.</span>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-4 justify-end">
                            <Button className="font-bold" color="warning" size="lg">
                                Cancelar Venta
                            </Button>
                            <Button className="font-bold" color="success" size="lg" onClick={agregarVenta}>
                                Registrar Venta
                            </Button>
                        </div>
                    </form>
                </article>
            </section>
        </React.Fragment>
    );
}
