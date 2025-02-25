const EventEmitter = require("events");

class MyCustomEmitter extends EventEmitter {
  constructor() {
    super();
    this.greeting = "Hello";
  }

  greet(name, age) {
    this.emit("greeting", `${this.greeting}, ${name}`, age); // then goes here
  }
}

const myCustomEmitter = new MyCustomEmitter();
const second = new MyCustomEmitter();

myCustomEmitter.on("greeting", (input, age) => {
  //calls this
  console.log(input, age);
});
second.on("greeting", (input, age) => {
  //calls this
  console.log(input, age);
});

myCustomEmitter.greet("Adarsh", 23); //code starts here
second.greet("Ayush", 16)