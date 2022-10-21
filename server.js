import express from "express";
import bodyParser from "body-parser";
import api from "./api/api.js";
import pageGenerator from "./modules/pageGenerator.js";

const app = express();
const port = 3000;


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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
