import express from "express";
import { PrintResponseTimeMiddleware } from "@middlewares";
import ApiRoutes from "@routes";
import cors from "./config/corsConfig";
import { serve, serveFiles, setup } from "swagger-ui-express";
import swaggerDocument from './config/swagger/swagger.json'

// Express
const app = express();

// Is on development mode
const isDev = Bun.env.NODE_ENV === "development";

// Middlewares
{
	app.use(cors);
	if (isDev) app.use(PrintResponseTimeMiddleware);
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	console.log("✅ Middlewares are loaded");
}

// Routes
{
	app.use("/api", ApiRoutes);
	app.use('/api-docs', serveFiles(swaggerDocument) , setup(swaggerDocument))
	console.log("✅ Routes are loaded");
}

app.listen(3000, "localhost", async () => {
  console.log("Server is running on http://localhost:3000");

  if (isDev) console.log(`\n\nMETHOD\tSTATUS\tURL`);
});

export default app;
