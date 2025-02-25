import { mockProductData } from "./mockData.js";

//defining middleware globally
export const usingMiddleware = (req, res, next) => {
    console.log(`${req.method} ----- ${req.url}`); // logs this after every URL and request change
    next(); // It's important to call next() to pass control to the next middleware
  };


//creating middleware to avoid repetition of same logic
export const resolveUserByIndex = (req, res, next) => {
    const { params : {id}} = req
    const parsedId = parseInt(id)
    if(isNaN(parsedId)) return res.sendStatus(400)
  
    const findProductIndex = mockProductData.findIndex(user => user.id === parsedId)
    if (findProductIndex === -1) return res.sendStatus(404);
    req.findProductIndex = findProductIndex //no way to directly access the findProductIndex so we are appending it
                                            //to the req obj 
    next()
}