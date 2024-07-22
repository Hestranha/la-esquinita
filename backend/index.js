import express from "express";
import morgan from "morgan";
import ventasRoutes from "./src/routes/ventas.routes.js";
import cors from "cors";

//Intialization
const app = express();

//Settings
app.set("port", process.env.PORT || 4000);
app.use(cors());
//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
	res.send("funcionando");
});

app.use(ventasRoutes);

//Run Server
app.listen(app.get("port"), () =>
	console.log("Server listening on port", app.get("port"))
);
