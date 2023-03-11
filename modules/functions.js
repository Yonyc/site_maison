import { exec } from "child_process";

export async function WOL(MAC) {
    if (!MAC || !(/[0-9a-fA-F]{1,2}([\.:-])(?:[0-9a-fA-F]{1,2}\1){4}[0-9a-fA-F]{1,2}/.test(MAC))) return Promise.reject({ msg: "Invali MAC address" });
    return new Promise((resolve, reject) => {
        exec("wakeonlan " + MAC, (error, stdout, stderr) => {
            if (error) {
                return reject({ msg: error.message });
            }
            if (stderr) {
                return reject({ msg: stderr });
            }
            return resolve({ msg: stdout });
        });
    });
}