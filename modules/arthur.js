import express from "express";
import { WOL } from "./functions.js";

const arthur = new express.Router();

export default arthur;

arthur.use("/wake", async (req, res) => {
    let r;
    r = await WOL("0C:9D:92:C1:93:EB").catch(m => r = m);
    res.send(r.msg).end();
});
