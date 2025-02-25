const express = require("express");

const app = express(); //This app starts a server and listens on port 3000 for connections.
const port = 3000;

app.use(express.json())//middleware function for POST request

const mockProductData = [
  { id: 1, name: "cosmetics", price: "$10" },
  { id: 2, name: "groceries", price: "$5" },
  { id: 3, name: "healthcare", price: "$20" },
  { id: 4, name: "electronics", price: "$50" },
  { id: 5, name: "furniture", price: "$200" },
  { id: 6, name: "clothing", price: "$30" },
  { id: 7, name: "toys", price: "$15" },
  { id: 8, name: "books", price: "$12" },
  { id: 9, name: "stationery", price: "$8" },
  { id: 10, name: "kitchenware", price: "$25" },
  { id: 11, name: "sports equipment", price: "$100" },
  { id: 12, name: "gardening tools", price: "$35" },
  { id: 13, name: "pet supplies", price: "$40" }
];

const mockUsers = [
  { id: 1, name: "Alice", username: "alice123" },
  { id: 2, name: "Bob", username: "bob_the_builder" },
  { id: 3, name: "Charlie", username: "charlie_chaplin" },
  { id: 4, name: "David", username: "david_goliath" },
  { id: 5, name: "Eve", username: "eve_apple" },
  { id: 6, name: "Frank", username: "frank_stein" },
  { id: 7, name: "Grace", username: "graceful" },
  { id: 8, name: "Hank", username: "hank_the_tank" },
  { id: 9, name: "Ivy", username: "ivy_poison" },
  { id: 10, name: "Jack", username: "jack_sparrow" },
];

//creating middleware to avoid repetition of same logic
const resolveUserByIndex = (req, res, next) => {
    const { params : {id}} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
  
    const findProductIndex = mockProductData.findIndex(user => user.id === parsedId)
    if (findProductIndex === -1) return res.sendStatus(404);
    req.findProductIndex = findProductIndex //no way to directly access the findProductIndex so we are appending it
                                            //to the req obj 
    next()
}

app.get("/", (req, res) => {
  res.send("Hello World");
}); // creating a route end point and sending res

app.get("/api/products", (req, res) => {
  res.send(mockProductData);
}); // creating a route end point and sending res with an obj as JSON

//route params
app.get("/api/products/:id", resolveUserByIndex, (req, res) => {
  const { findProductIndex } = req
  const findProduct = mockProductData[findProductIndex]
  if (!findProduct) return res.sendStatus(400);
  return res.send(findProduct);
});

//query param
app.get("/api/users", (req, res) => {
    const {filter , value } = req.query
    if(filter && value) {
        return res.send(
            mockUsers.filter(user => user[filter].includes(value))
        )
    }
    return res.send(mockUsers)
})

//POST request for USER
app.post('/api/users', (req, res) => {
  const {body} = req
  const newUser = {id : mockUsers[mockUsers.length - 1].id + 1 , ...body}
  mockUsers.push(newUser)
  return res.status(201).send('User added successfully');
});

//POST request for Product
app.post('/api/products/:id', (req, res) => {
  const {body} = req
  const newProduct = {id : mockProductData[mockProductData.length - 1].id + 1 , ...body}
  mockProductData.push(newProduct)
  return res.status(201).send('Product added successfully');
});


//PUT request 
app.put("/api/products/:id", resolveUserByIndex, (req, res) => {
  const { body, findProductIndex} = req
  mockProductData[findProductIndex] = { id: mockProductData[findProductIndex].id, ...body}
  return res.sendStatus(200)
})

//PATCH Request
app.patch("/api/products/:id", resolveUserByIndex, (req, res) => {
  const { body , findProductIndex } = req
  mockProductData[findProductIndex] = { ...mockProductData[findProductIndex], ...body}
  return res.sendStatus(200)
})

//DELETE Request

app.delete("/api/products/:id", resolveUserByIndex , (req, res)=> {
  const { findProductIndex } = req
  mockProductData.splice(findProductIndex, 1)
  return res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Server is Running at port ${port}`);
}); // creating the server
