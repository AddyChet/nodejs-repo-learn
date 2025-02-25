import { Router } from "express";
import { resolveUserByIndex } from "../../utils/middlewares.js"
import { mockProductData } from "../../utils/mockData.js";
// import { query, validationResult, body, matchedData, checkSchema } from "express-validator";
// import { createUserValidationSchema } from "./utils/createUserValidationSchema.js";

const Productroute = Router();

Productroute.get("/api/products", (req, res) => {
  console.log(req.headers.cookie) //when cookie parser wasn't there we can see it this way
  console.log(req.cookies) // when cookie parser is there we can see the cookies this way
  console.log(req.signedCookies)
  
  if(req.signedCookies.hello && req.signedCookies.hello === "world") {
    return res.status(200).send(mockProductData);
  }

  return res.status(403).send({msg : "you need a cookie to access this"})
});

Productroute.get("/api/products/:id", resolveUserByIndex, (req, res) => {
  const { findProductIndex } = req
  const findProduct = mockProductData[findProductIndex]
  if (!findProduct) return res.sendStatus(400);
  return res.send(findProduct);
});


//POST request for Product
Productroute.post("/api/products", (req, res) => {
  const { body } = req;
  const newProduct = {
    id: mockProductData[mockProductData.length - 1].id + 1,
    ...body,
  };
  mockProductData.push(newProduct);
  return res.status(201).send("Product added successfully");
});

//PUT request
Productroute.put("/api/products/:id", resolveUserByIndex, (req, res) => {
  const { body, findProductIndex} = req
  mockProductData[findProductIndex] = { id: mockProductData[findProductIndex].id, ...body}
  return res.sendStatus(200)
})

//PATCH Request
Productroute.patch("/api/products/:id", resolveUserByIndex, (req, res) => {
  const { body , findProductIndex } = req
  mockProductData[findProductIndex] = { ...mockProductData[findProductIndex], ...body}
  return res.sendStatus(200)
})

//DELETE Request
Productroute.delete("/api/products/:id", resolveUserByIndex , (req, res)=> {
  const { findProductIndex } = req
  mockProductData.splice(findProductIndex, 1)
  return res.sendStatus(200)
})


export default Productroute;