import pool from "../database.js";

export async function getUltimoNumeroBoleta(req, res) {
	try {
		const [num_boleta] = await pool.query(
			"SELECT obtener_ultimo_numero_boleta() AS ultimo_numero_boleta"
		);

		res.json(num_boleta);
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