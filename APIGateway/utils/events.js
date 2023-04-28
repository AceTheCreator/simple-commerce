const { EventEmitter } = require("events");
var event = new EventEmitter();

async function listener (id){
    return new Promise((resolve, reject) => {
        event.once(id, async (data) => {
          resolve(JSON.parse(data));
        });
    })
}

async function emitter (id, message) {
event.emit(id, message)
}

module.exports = {
    listener,
    emitter
}