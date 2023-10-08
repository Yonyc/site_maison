import express from "express";
import bodyParser from "body-parser";
import api from "./api/api.js";
import pageGenerator from "./modules/pageGenerator.js";
import { TITLE } from "./config.js";
import alex from "./modules/alex.js";
import arnaud from "./modules/arnaud.js";
import arthur from "./modules/arthur.js";

const app = new express.Router();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/api", api);

app.use("/alex", alex);
app.use("/arnaud", arnaud);
app.use("/arnaud", arthur);

/* app.use("/arnaud", (req, res) => {
    res.write(pageGenerator("./pages/arnaud.html", "Arnaud", ["/js/arnaud.js"]));
    res.end();
}); */

app.use("/", (req, res) => {
    res.write(pageGenerator("./pages/index.html", "Home", ["/js/home.js"]));
    res.end();
});

export default app;
