const express = require("express")
const path = require("path")
const app = express()

//setting view engine as ejs
app.set("view engine", "ejs")

//set the dir for the view
app.set("views", path.join(__dirname, 'views'))

// dummy data
const products = [
    {id :1, product: "product-1"},
    {id :2, product: "product-2"},
    {id :3, product: "product-3"}
]

app.get("/", (req, res) => {
    res.render('home', {title : "Home", products : products})
})

app.get("/about" , (req, res) => {
    res.render('about', {title : "About"})
})

app.listen(3000, ()=> {
    console.log("Sever is running")
})