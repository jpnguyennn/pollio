import { Request, Response } from "express";
import { createApp } from "./createApp";

// initialize express app
const app = createApp();

// initialize port
const PORT = 3000;

// start server
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
