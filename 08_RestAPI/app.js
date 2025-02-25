const express = require("express")
const app = express()

//MidddleWare
app.use(express.json())

let books = [
    {id : 1, title : "book-1"},
    {id : 2, title : "book-2"}
]

app.get("/", (req,res)=> {
    res.json({
        message : "Welcome to The BOOK STORE"
    })
})


app.get("/api/books", (req,res)=> {
    res.status(200).json(books)
})

app.get("/api/books/:id", (req,res)=> {
    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.status(201).json({message : "wrong ID entered"})
    const findBook = books.find(book => book.id === parsedId)
    if(findBook === -1) return res.sendStatus(400)
    return res.status(200).json(findBook)
})

app.post("/add", (req,res) => {
    const newBook = {id : books.length + 1, title : `book-${books.length + 1}`}
    books.push(newBook)
    res.status(200).json({
        data: newBook,
        message: "New book is added successfully",
    });
})


app.delete("/api/books/:id", (req, res)=> {
    const parsedId = parseInt(req.params.id)
    if(isNaN(parsedId)) return res.status(201).json({message : "wrong ID entered"})
    const findBook = books.find(book => book.id === parsedId)
    if(findBook === -1) return res.sendStatus(400)
    books.splice(findBook,1)
    return res.status(200).json(findBook)
})

app.listen(3000, ()=> {
    console.log("Server Started")
})