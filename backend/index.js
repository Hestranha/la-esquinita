import express from "express";
import morgan from "morgan";
import ventasRoutes from "./src/routes/ventas.routes.js.js";
import loginRoutes from "./src/routes/login.routes.js";
import cookieParser from "cookie-parser";
import * as authorization from "./src/middlewares/authorization.js";
import cors from "cors";

//Intialization
const app = express();

//Settings
app.set("port", process.env.PORT || 4000);
app.use(
	cors({ origin: "https://la-esquinita.vercel.app/ventas", credentials: true })
);
//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routes
app.get("/", authorization.soloPublico, (req, res) => {
	res.render("xdd");
});

app.use(cookieParser());
app.use(loginRoutes);
app.use(ventasRoutes);

//Run Server
app.listen(app.get("port"), () =>
	console.log("Server listening on port", app.get("port"))
);

export default app;
