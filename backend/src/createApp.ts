import express, { Request, Response, NextFunction } from "express";
import pollsRouter from "./routes/polls";

export function createApp() {
	// initialize express app
	const app = express();

	// initialize middleware
	app.use(express.json());

	// initialize app route
	app.get("/", (req: Request, res: Response) => {
		res.send("Pollio API is running");
	});

	// initialize external routes
	app.use("/polls", pollsRouter);

	return app;
}