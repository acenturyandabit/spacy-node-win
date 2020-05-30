const WebSocket = require('ws');

const port = 12672;

module.exports = function spacy() {
    let ws = new WebSocket(`ws://localhost:${port}`);
    let resolution = undefined;
    ws.on('message', (data) => {
        let obj = JSON.parse(String(data));
        resolution(obj);
    })
    let backlog = [];
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
    })
    this.nlp = async (q) => {
        // buffer the q
        return new Promise((res) => {
            backlog.push([res, q]);
        })
    }
}