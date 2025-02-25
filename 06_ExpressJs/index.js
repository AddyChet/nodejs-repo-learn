import express from "express";
import Productroute from "./src/routes/Products.js";
import Usersroute from "./src/routes/Users.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/mockData.js";
import passport from "passport";

const app = express();
const port = 3000;

app.use(express.json()); //middleware function for POST request

// use the cookie parser before route --> as it will not parse cookies for the route
app.use(cookieParser("helloworld"));

// use session before any endpoints for it to work
app.use(
  session({
    secret: "4uxv93hj4h",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 2,
    },
  })
);

// call passport in-between session and routes
app.use(passport.initialize())
// this will take care of adding dynamic user to request object
app.use(passport.session())

//endpoints
app.use(Productroute);
app.use(Usersroute);

//authenticating the cookie for products to be visible
app.get("/", (req, res) => {
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 60000 * 60 * 2, signed: true });
  res.status(200).send({ msg: "Welcome to the Homepage" });
});

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) {
    return res.status(400).send({ msg: "Bad Credentials" });
  }

  //setting the user inside session data struc as to keep the sesion id and user in the same
  req.session.user = findUser;
  res.status(200).send({ msg : "user found", findUser});
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session)
    //esko bhitra session ko details plus user will be there
  })

  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Not Authenticated" });
});

app.post("/api/cart", (req, res) => {
  if(!req.session.user) return res.statusCode(401).send({ msg: "Not Authenticated" })
  const {body : item} = req
  const {cart} = req.session

  if(cart) {
    cart.push(item)
  } 
  else {
    req.session.cart = [item]
  }
  return res.status(201).send(item)
})

app.get("/api/cart", (req, res) => {
  if(!req.session.user) return res.status(401).send({ msg: "Not Authenticated" })
  return res.send(req.session.cart ?? [])
})

app.listen(port, () => {
  //This app starts a server and listens on port 3000 for connections.
  console.log(`Server is Running at port ${port}`);
}); // creating the server

/* 

// creating a route end point and sending res with an obj as JSON

//route params
app.get("/api/products/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    return res.status(400).send({ msg: "bad Request, product not found" });
  }
  const findProduct = mockProductData.find((user) => user.id === parsedId);
  if (!findProduct) return res.sendStatus(400);
  return res.send(findProduct);
});

//query param
app.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("must be within 3-10 charcs"),
  (req, res) => {
    //this query value will be passed into the request obj which has express validator as a key
    const result = validationResult(req); // passing the request to the function to get proper errors in console
    console.log(result);

    //retunrs true if no errors, else returns false
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    }
    const { filter, value } = req.query;
    if (filter && value) {
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    }
    return res.send(mockUsers);
  }
);

//POST request for USER
app.post(
  "/api/users",
  // using the below as a schema object
  checkSchema(createUserValidationSchema),
  /* 
  *validation check for username*
    body("username")
    .notEmpty()
    .withMessage("Username cannot be Empty")
    .isString()
    .withMessage("Username has to be a String")
    .isLength({ min: 4, max: 32 })
    .withMessage("Username must be 4 - 32 chars long"),

  *validation check for displayName*
    body("displayName").notEmpty().withMessage("Display Name cannot be Empty"),

    (req, res) => {
      const result = validationResult(req);
      console.log(result);
  
      //retunrs true if no errors, else returns false
      if (!result.isEmpty()) {
        res.status(400).send({ errors: result.array() });
      }
  
      const data = matchedData(req); // gives me the santised data back --> similar to req.body object format
      // const { body } = req;
      const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
      mockUsers.push(newUser);
      return res.status(201).send("User added successfully");
    }
  );
  
  //POST request for Product
  app.post("/api/products/:id", (req, res) => {
    const { body } = req;
    const newProduct = {
      id: mockProductData[mockProductData.length - 1].id + 1,
      ...body,
    };
    mockProductData.push(newProduct);
    return res.status(201).send("Product added successfully");
  });
  
  //PUT request
  app.put("/api/products/:id", (req, res) => {
    const {
      body,
      params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
  
    const findProductIndex = mockProductData.findIndex(
      (user) => user.id === parsedId
    );
    if (findProductIndex === -1) return res.sendStatus(404);
    mockProductData[findProductIndex] = { id: parsedId, ...body };
    return res.sendStatus(200);
  });
  
  //PATCH Request
  app.patch("/api/products/:id", (req, res) => {
    const {
      body,
      params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
  
    const findProductIndex = mockProductData.findIndex(
      (user) => user.id === parsedId
    );
    if (findProductIndex === -1) return res.sendStatus(404);
    mockProductData[findProductIndex] = {
      ...mockProductData[findProductIndex],
      ...body,
    };
    return res.sendStatus(200);
  });
  
  //DELETE Request
  
  app.delete("/api/products/:id", (req, res) => {
    const {
      params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findProductIndex = mockProductData.findIndex(
      (user) => user.id === parsedId
    );
    if (findProductIndex === -1) return res.sendStatus(404);
    mockProductData.splice(findProductIndex, 1);
    return res.sendStatus(200);
  });
  
  app.listen(port, () => {
    console.log(`Server is Running at port ${port}`);
  }); // creating the server
  
*/
