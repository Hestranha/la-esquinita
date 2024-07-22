"use client";
import React from "react";
import { usePathname } from "next/navigation";
// className={`${pathname === '/' ? 'hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900' : ''}`}
// className={`${pathname.startsWith('/ventas') ? 'hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900' : ''}`}
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon, // analisis
    ShoppingBagIcon, // comprando xd
    UserCircleIcon, // usuario
    Cog6ToothIcon, // ajustes
    InboxIcon,
    PowerIcon,
    BanknotesIcon, // ventas
    ShoppingCartIcon, // compras
    ArrowsRightLeftIcon, // movimientos
    ArchiveBoxIcon, // inventario
    SquaresPlusIcon, // elementos
    UserGroupIcon, // colaboradores
    DocumentChartBarIcon, // reportes
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function MultiLevelSidebar() {
    const [open, setOpen] = React.useState(0);
    const pathname = usePathname();

    const handleOpen = (value: number) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
            <Link href="/">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="blue-gray">
                        LibreriAdri
                    </Typography>
                </div>
            </Link>
            <List>
                <Link href="/ventas">
                    <ListItem className={`${pathname.startsWith('/ventas') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                        <ListItemPrefix>
                            <BanknotesIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Ventas
                    </ListItem>
                </Link>
                <Link href="/compras">
                    <ListItem className={`${pathname.startsWith('/compras') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                        <ListItemPrefix>
                            <ShoppingCartIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Compras
                    </ListItem>
                </Link>
                <Link href="/inventario">
                    <ListItem className={`${pathname.startsWith('/inventario') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                        <ListItemPrefix>
                            <ArchiveBoxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Inventario
                    </ListItem>
                </Link>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className={`p-0 ${pathname.startsWith('/movimientos') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`} selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ArrowsRightLeftIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Movimientos
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link href="/movimientos/ventas">
                                <ListItem className={`${pathname.startsWith('/movimientos/ventas') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Ventas
                                </ListItem>
                            </Link>
                            <Link href="/movimientos/compras">
                                <ListItem className={`${pathname.startsWith('/movimientos/compras') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Compras
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className={`p-0 ${pathname.startsWith('/elementos') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`} selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <SquaresPlusIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Elementos
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link href="/elementos/productos">
                                <ListItem className={`${pathname.startsWith('/elementos/productos') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Productos
                                </ListItem>
                            </Link>
                            <Link href="/elementos/categorias">
                                <ListItem className={`${pathname.startsWith('/elementos/categorias') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Categorías
                                </ListItem>
                            </Link>
                            <Link href="/elementos/marcas">
                                <ListItem className={`${pathname.startsWith('/elementos/marcas') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Marcas
                                </ListItem>
                            </Link>
                            <Link href="/elementos/cargos">
                                <ListItem className={`${pathname.startsWith('/elementos/cargos') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Cargos
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 3}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className={`p-0 ${pathname.startsWith('/colaboradores') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`} selected={open === 3}>
                        <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <UserGroupIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Colaboradores
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link href="/colaboradores/clientes">
                                <ListItem className={`${pathname.startsWith('/colaboradores/clientes') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Clientes
                                </ListItem>
                            </Link>
                            <Link href="/colaboradores/empleados">
                                <ListItem className={`${pathname.startsWith('/colaboradores/empleados') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Empleados
                                </ListItem>
                            </Link>
                            <Link href="/colaboradores/proveedores">
                                <ListItem className={`${pathname.startsWith('/colaboradores/proveedores') ? 'bg-blue-gray-50 bg-opacity-80 text-blue-gray-900' : ''}`}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    Proveedores
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 4}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 4 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 4}>
                        <AccordionHeader onClick={() => handleOpen(4)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <DocumentChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal">
                                Reportes
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Ventas
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                </ListItemPrefix>
                                Compras
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
            </List>
        </Card>
    );
}