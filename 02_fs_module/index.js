const fs = require("fs");
const path = require("path");

const dataFolder = path.join(__dirname, "data");
// c:\Users\adars\Startup\Node Js\Sangam Mukherjee\fs_module\data

/* no negation means --> it will always be false cause 
c:\Users\adars\Startup\Node Js\Sangam Mukherjee\fs_module\data
doesn't exist 

so we use the negation to make it true for this block of if to execute
*/

if (!fs.existsSync(dataFolder)) {
    fs.mkdirSync(dataFolder);
    // creates the data folder
}

// create a file synchronously
const filePath = path.join(dataFolder, "example.txt");
fs.writeFileSync(filePath, "Hello from Node Js, I am learning filesystem");

const readContent = fs.readFileSync(filePath, "utf-8"); // we specify utf-8 cause it will be a buffer
console.log(readContent);

// appending to the file
fs.appendFileSync(filePath, "\nThis is a new line that is added to the file");

// reading the appended content
const updatedContent = fs.readFileSync(filePath, "utf-8");
console.log(updatedContent);



//asynchronous way of creating the file

const asyncFilePath = path.join(dataFolder, "async-exp.txt")
fs.writeFile(asyncFilePath,"hello from Async node js",  (err) => {
    if(err) throw err;
    console.log("ayscn file created")

    //reading file

    fs.readFile(asyncFilePath, "utf-8", (err, data)=> {
        if(err) throw err;
        console.log(data)
    })

    //append
    fs.appendFile(asyncFilePath, "\n this is another line from async", (err)=> {
        if(err) throw err;
        console.log("newline added")

    //updated file
    fs.readFile(asyncFilePath, "utf-8", (err, updatedData)=> {
        if(err) throw err;
        console.log(updatedData)
    })
    })
})