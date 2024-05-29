import { useAsyncList } from "@react-stately/data";

export type SWCharacter = {
    name: string;
    precio_unitario: number;
};

export function useBuscarProducto() {
    let list = useAsyncList<SWCharacter>({
        async load({ signal, filterText }) {
            let res = await fetch(`/api/ventas/buscarProducto?search=${filterText}`, { signal });
            let json = await res.json();

            return {
                items: json.results,
            };
        },
    });

    return {
        list
    };
}


