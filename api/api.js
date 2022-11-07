import { Router } from "express";

const apiRouter = new Router();

apiRouter.post("/login", (req, res) => {
    res.json({test: "login"});
});

export default apiRouter;