"use client";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../../components/SearchIcon";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Spinner } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Selection } from "@nextui-org/react";

export default function BuscarProducto({ isOpen, onOpenChange }: { isOpen: boolean, onOpenChange: () => void }) {
    const [page, setPage] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(true);

    let list = useAsyncList({
        async load({ signal, cursor }) {
            if (cursor) {
                setPage((prev) => prev + 1);
            }
            const res = await fetch(cursor || "https://swapi.py4e.com/api/people/?search=", { signal });
            let json = await res.json();

            if (!cursor) {
                setIsLoading(false);
            }

            return {
                items: json.results,
                cursor: json.next,
            };
        },
    });

    const hasMore = page < 9;
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} placement="center">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Encuentra un Producto</ModalHeader>
                        <ModalBody>
                            <Input
                                isClearable
                                radius="lg"
                                placeholder="Busca un producto..."
                                startContent={
                                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                }
                            />
                            <Table
                                isHeaderSticky
                                color="danger"
                                selectionMode="single"
                                aria-label="Example table with client side sorting"
                                bottomContent={
                                    hasMore && !isLoading ? (
                                        <div className="flex w-full justify-center">
                                            <Button isDisabled={list.isLoading} variant="flat" onPress={list.loadMore}>
                                                {list.isLoading && <Spinner color="white" size="sm" />}
                                                Ver más
                                            </Button>
                                        </div>
                                    ) : null
                                }
                                classNames={{
                                    base: "max-h-[420px] overflow-scroll",
                                    table: "min-h-[420px]",
                                }}
                                onSelectionChange={(keys: Selection) => {
                                    console.log("Elementos seleccionados:", keys);
                                }}
                            >
                                <TableHeader>
                                    <TableColumn key="name">Nombre</TableColumn>
                                    <TableColumn key="height">Stock</TableColumn>
                                </TableHeader>
                                <TableBody
                                    isLoading={isLoading}
                                    items={list.items}
                                    loadingContent={<Spinner label="Loading..." />}
                                >
                                    {(item) => (
                                        <TableRow key={(item as any).name}>
                                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
