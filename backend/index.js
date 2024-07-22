import express from "express";
import morgan from "morgan";
import ventasRoutes from "./src/routes/ventas.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//Intialization
const app = express();

//Settings
app.set("port", process.env.PORT || 4000);
app.use(cors({ origin: "https://la-esquinita.vercel.app", credentials: true }));
//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
	res.render(`
		<h1>Funcionando</h1>
		`);
});

app.use(cookieParser());
app.use(ventasRoutes);

//Run Server
app.listen(app.get("port"), () =>
	console.log("Server listening on port", app.get("port"))
);
