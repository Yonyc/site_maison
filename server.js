
import http from "http";
import https from "https";

import { PORT, PORTS, httpsCreditentials } from "./config.js";
import app from "./app.js";



if (httpsCreditentials) {
  https.createServer(httpsCreditentials, app).listen(PORT, () => console.log(`Server listening HTTPS on port ${PORT}`));
} else {
  http.createServer(app).listen(PORT, () => console.log(`Server listening HTTP on port ${PORT}`));
}


PORTS.forEach(p => {
  try {
    http.createServer((req, res) => {
      res.writeHead(301, { "Location": `http${httpsCreditentials ? "s" : ""}://` + req.headers.host.replace(p,PORT) + req.url});
      res.end();
    }).listen(p, () => console.log(`Redirecting port ${p} to ${PORT}`));
  } catch (error) {
    console.log(`Can't open port '${p}'\n${error}`);
  }
});
