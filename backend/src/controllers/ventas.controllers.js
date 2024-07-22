import pool from "../database.js";

async function getUltimoNumeroBoleta2() {
	try {
		const [rows] = await pool.query(`
            SELECT LPAD(SUBSTRING(MAX(numero_boleta), 4) + 1, 6, '0') AS numero_boleta
            FROM boleta
        `);

		// Manejo del caso cuando no haya resultados
		const num_boleta = rows[0]?.numero_boleta || "000001";
		return `BOL${num_boleta}`;
	} catch (error) {
		console.error("Error en getUltimoNumeroBoleta:", error);
		throw new Error("Error al obtener el último número de boleta");
	}
}

export async function getUltimoNumeroBoleta(req, res) {
	try {
		const [rows] = await pool.query(`
            SELECT numero_boleta AS ultimo_numero_boleta
            FROM boleta
            ORDER BY fecha_boleta DESC
            LIMIT 1
        `);

		// Asegúrate de que se maneje el caso cuando no haya resultados
		const num_boleta = rows[0]?.ultimo_numero_boleta || null;

		res.json({ ultimo_numero_boleta: num_boleta });
	} catch (error) {
		console.error("Error en getUltimoNumeroBoleta:", error);
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

	// Función para convertir la fecha al formato MySQL
	function convertToMySQLDate(dateString) {
		const [day, month, year] = dateString.split("/");
		return `${year}-${month}-${day}`;
	}

	function convertToMySQLDateTime(dateTimeString) {
		const [datePart, timePart] = dateTimeString.split(" ");
		const [day, month, year] = datePart.split("/");
		return `${year}-${month}-${day} ${timePart}`;
	}

	const fecha_registro_cliente = convertToMySQLDateTime(fecha_registro);
	const fecha_boleta_mysql = convertToMySQLDateTime(fecha_boleta);

	try {
		// Obtener el último número de boleta
		const numero_boleta = await getUltimoNumeroBoleta2();
		const dni_emp = "01234567";

		// Insertar cliente y obtener el ID del cliente recién insertado
		const [cliente_result] = await pool.query(
			`INSERT INTO cliente (nombre_cliente, celular_cliente, direccion_cliente, fecha_registro_cliente) VALUES (?, ?, ?, ?)`,
			[cliente, celular_cliente, direccion_cliente, fecha_registro_cliente]
		);
		const id_cliente = cliente_result.insertId;

		// Insertar boleta
		await pool.query(
			`INSERT INTO boleta (numero_boleta, DNI_empleado, id_cliente, id_metodo_pago, fecha_boleta, metodo_entrega, total_boleta) VALUES (?, ?, ?, ?, ?, ?, ?)`,
			[
				numero_boleta,
				dni_emp,
				id_cliente,
				metodo_pago,
				fecha_boleta_mysql,
				metodo_entrega,
				total_venta,
			]
		);

		// Insertar detalle de boleta
		for (const producto of productos) {
			const { id_producto, precio_venta, cantidad_venta } = producto;
			await pool.query(
				`INSERT INTO detalle_boleta (numero_boleta, id_producto, precio_venta, cantidad_venta) VALUES (?, ?, ?, ?)`,
				[numero_boleta, id_producto, precio_venta, cantidad_venta]
			);
		}

		res.status(200).json({ message: "Venta registrada exitosamente" });
	} catch (error) {
		console.error("Error en setSubirVenta:", error);
		res.status(500).json({ message: error.message });
	}
}
