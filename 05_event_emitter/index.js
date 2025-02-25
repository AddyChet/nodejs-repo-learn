const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

//registering an event
eventEmitter.on('greet', (name,age) => {
    console.log(`hello ${name}, your age is ${age}`);
  });

//triggering the event
eventEmitter.emit('greet', "Adarsh", 23);