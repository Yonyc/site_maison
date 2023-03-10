import express from "express";
import { WOL } from "./functions.js";

const arnaud = new express.Router();

export default arnaud;

arnaud.use("/wake", async (req, res) => {
    let r;
    r = await WOL("00:d8:61:7c:78:b9").catch(m => r = m);
    res.send(r.msg).end();
});