import { createPool } from "mysql2/promise";

const pool = createPool({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "113479",
	database: "libreria_adri",
});

export default pool;
