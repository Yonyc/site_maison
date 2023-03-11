import express from "express";
import { WOL } from "./functions.js";

const alex = new express.Router();

export default alex;

alex.use("/wake", async (req, res) => {
    let r;
    r = await WOL("4C:CC:6A:D6:81:B7").catch(m => r = m);
    res.send(r.msg).end();
});




