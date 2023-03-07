import express from "express";
import { exec } from "child_process";

const alex = new express.Router();

export default alex;

alex.use("/wake", async (req, res) => {
    exec("wakeonlan 4C:CC:6A:D6:81:B7", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return res.send(error.message).end();
        }
        if (stderr) {
            return res.send(stderr).end();
        }
        res.send(stdout).end();
    });
});




