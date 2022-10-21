import express from "express";
import bodyParser from "body-parser";
import api from "./api/api.js";
import pageGenerator from "./modules/pageGenerator.js";

const app = new express.Router();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use("/api", api);

app.use("/*", (req, res) => {
  let pagePath = "./pages" + req.baseUrl + ".html";

  if (req.baseUrl == "" || req.baseUrl == "/") {
    pagePath = "./pages/index.html";
  }

  res.write(pageGenerator(pagePath));
  res.end();
});

export default app;
