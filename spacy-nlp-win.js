const WebSocket = require('ws');

const port = 12672;
const plsSpawn = false;

const { spawn } = require('child_process');

let spacyWaiters = [];
let spacyStarted = false;
if (plsSpawn) {
    const srv = spawn("python", ["./spacytest.py"]);
    srv.stdout.on("data", data => {
        console.log(data.toString());
        if (data.toString().includes("SPACY OK")) {
            spacyWaiters.forEach(i => i.startWS());
            spacyWaiters = [];
            spacyStarted = true;
        }
    });

    srv.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    srv.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    srv.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
} else {
    spacyStarted = true;
}




module.exports = function spacy() {
    let ws;
    let resolution = undefined;
    this.startWS = () => {
        ws = new WebSocket(`ws://localhost:${port}`);
        ws.on('message', (data) => {
            let obj = JSON.parse(String(data));
            resolution(obj);
        });
        ws.on('open', async () => {
            this.nlp = async (q) => {

                return new Promise((res) => {
                    resolution = res;
                    ws.send(q);
                })
            }
            backlog.forEach(i => {
                i[0](this.nlp(i[1]));
            })
            //console.log("ok we good");
        })
    }
    if (spacyStarted) this.startWS();
    else {
        spacyWaiters.push(this);
    }

    let backlog = [];

    this.nlp = async (q) => {
        // buffer the q
        return new Promise((res) => {
            backlog.push([res, q]);
        })
    }
}