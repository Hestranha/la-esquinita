import pool from "../database.js";

export async function setSubirVenta(req, res) {
	const {
		cliente,
		celular_cliente,
		direccion_cliente,
		fecha_registro,
		metodo_pago,
		fecha_boleta,
		metodo_entrega,
		total_venta,
		productos,
	} = req.body;

	const productos_json = JSON.stringify(productos);

	try {
		// Obtener el último número de boleta
		const [num_boleta_result] = await pool.query(
			`SELECT LPAD(SUBSTRING((SELECT MAX(numero_boleta) FROM boleta), 4) + 1, 6, '0') AS numero_boleta`
		);
		const numero_boleta = num_boleta_result[0].numero_boleta;

		// Insertar cliente
		await pool.query(
			`INSERT INTO cliente (nombre, celular, direccion, fecha_registro) VALUES (?, ?, ?, ?)`,
			[cliente, celular_cliente, direccion_cliente, fecha_registro]
		);

		// Insertar boleta
		await pool.query(
			`INSERT INTO boleta (numero_boleta, metodo_pago_id, fecha_boleta, metodo_entrega_id, total_venta) VALUES (?, ?, ?, ?, ?)`,
			[numero_boleta, metodo_pago, fecha_boleta, metodo_entrega, total_venta]
		);

		// Insertar detalle de boleta
		await pool.query(
			`INSERT INTO detalle_boleta (numero_boleta, productos) VALUES (?, ?)`,
			[numero_boleta, productos_json]
		);

		res.status(200).json({ message: "Venta registrada exitosamente" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
export async function getMetodoPagoProducto(req, res) {
	try {
		const [metodosPago] = await pool.query(
			"SELECT id_metodo_pago as value, nombre_metodo_pago as label FROM metodo_pago"
		);
		res.json(metodosPago);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}

export async function getBuscarProducto(req, res) {
	try {
		const page = parseInt(req.query.page) || 1;
		const pageSize = 5;
		const offset = (page - 1) * pageSize;
		const searchTerm = req.query.search || "";

		const searchQuery = `
            SELECT id_producto, nombre_producto, precio_unitario
            FROM producto
            WHERE nombre_producto LIKE ?
            LIMIT ? OFFSET ?
        `;
		const [productosEncontrados] = await pool.query(searchQuery, [
			`%${searchTerm}%`,
			pageSize,
			offset,
		]);

		const countQuery = `
            SELECT COUNT(*) AS total 
            FROM producto
            WHERE nombre_producto LIKE ?
        `;
		const [totalProductos] = await pool.query(countQuery, [`%${searchTerm}%`]);
		const total = totalProductos[0].total;
		const totalPages = Math.ceil(total / pageSize);

		const response = {
			count: productosEncontrados.length,
			total: total,
			totalPages: totalPages,
			currentPage: page,
			next:
				page < totalPages
					? `/ventas/buscarProducto?search=${searchTerm}&page=${
							Number(page) + 1
					  }`
					: null,
			previous:
				page > 1
					? `/ventas/buscarProducto?search=${searchTerm}&page=${
							Number(page) - 1
					  }`
					: null,
			results: productosEncontrados.map((producto) => ({
				id_producto: producto.id_producto,
				name: producto.nombre_producto,
				precio_unitario: producto.precio_unitario,
			})),
		};

		res.json(response);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}
