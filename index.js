import express from "express";
import { matchRouter } from "./src/routes/matchRouter";
const app = express();
const port = 8080;

//middlewares
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello from Express server!");
});

app.use('/matchRoute', matchRouter);

app.listen(port, () => {
	console.log(`Server listening through port: ${port}`);
});
