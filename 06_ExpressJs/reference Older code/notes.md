webframework for node js

benefits of expressJS

1. routing
2. middleware
3. template engines -- ejs, pug, etc
4. generate dynamic html
5. static file serving
6. error handling
7. create restful API dev

//install express and create a node_modules

Route params--
"/api/products/:id" --> we can get this id in request obj -> const parsedId = parseInt(req.params.id)
also check isNaN true or not cause the id will come in string

query Param :
https:www.fake.com/products/?key=value&key2=value2

    Client-Side Query Parameters:

    You can use query parameters in the URL to filter or search for items on the client side without making additional server requests.

    For example, if you have a list of products, you can filter them on the client side by appending query parameters to the URL, like ?category=electronics&price=low. The client-side JavaScript can then read these parameters and filter the displayed items accordingly.

    Server-Side Query Parameters:

    When the client needs to fetch data from the server based on specific criteria, it can send query parameters in the request URL.

    For example, a search bar can send a query parameter to the server to search for a specific term. The server processes this request and returns the matching results.

//create data using post request

    Front-End Form: The front-end usually has a form or input fields where a user can enter the details of the new user (like name, email, etc.).

    POST Request: When the form is submitted, a POST request is sent to the server with the new user’s data in the request body.

    Server-Side Handling:

    The server receives the POST request.

    It processes the data from the request body.

    The server then adds the new user to the existing list or database.

    Response:

    The server responds with a status code (typically 201, which means "Created") indicating that the new resource (user) was successfully added.

    The server may also send back the newly created user’s data or an acknowledgement message.

    express.json() is a middleware function that is used to parse incoming request bodies that are in JSON format. When you include this middleware in your application, it ensures that the request bodies are automatically parsed and available as a JavaScript object under req.body. This is particularly useful when handling POST requests where the client sends data to the server.

    If you do not include the express.json() middleware, the incoming JSON data won't be automatically parsed into a JavaScript object. Consequently, req.body will be undefined, even though the data is still sent by the client.

//PUT and PATCH Request --> update data
patch --> updates it partially --> EG --> a portion of a user record --> username
also we can append new data with help of this.

    put ---> updating entirely --> including every single field in the body or else it will be null and omitted
                                   and data will be lost

//PATCH requests are used to update parts of a resource. For example, you can update just a specific field like the username or append new data without modifying the entire record.

PUT requests, on the other hand, are used to update the entire resource. If any fields are omitted in the request body, they will be set to null or removed, which can lead to data loss if the complete data is not included.

//What is a MIDDLEWARE
Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application’s request-response cycle. The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

    Middleware functions can perform the following tasks:

    Execute any code.
    Make changes to the request and the response objects.
    End the request-response cycle.
    Call the next middleware in the stack.

    Middleware functions are used to handle tasks such as authentication, logging, error handling, and more.


cookies --> small pieces of data sent by server to web browser(client)
        --> they rememberi user preferences, track user sessions, and store temporary data
    eg  --> to save cart data of ecommerce for customers to view later


    // use the cookie parser before route --> as it will not parse cookies for the route
        app.use(cookieParser())

    //with a secret "helloworld"
        app.use(cookieParser("helloworld"))

    //creation of cookie 

    //authenticating the cookie for products to be visible
        app.get("/", (req,res)=> {
            res.cookie("hello", "world", {maxAge : 60000 * 60 * 2, signed : true})
            res.status(200).send({msg : "Welcome to the Homepage"})
        })


    

    //using in PRODUCTS :
    Productroute.get("/api/products", (req, res) => {
        console.log(req.headers.cookie) //when cookie parser wasn't there we can see it this way
        console.log(req.cookies) // when cookie parser is there we can see the cookies this way
        console.log(req.signedCookies)
  
        if(req.signedCookies.hello && req.signedCookies.hello === "world") {
            return res.status(200).send(mockProductData);

        return res.status(403).send({msg : "you need a cookie to access this"})
    }  );

Session : 
    Session is a way to store data on the server for individual users against a unique session ID. 
    This session ID is typically sent to the client (e.g., web browser) and is stored as a cookie. 
    The session allows the server to recognize subsequent requests from the same user and maintain a consistent state.
        
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

    app.get("/", (req,res)=> {
        console.log(req.session)
        console.log(req.sessionID)
        console.log(req.session.id)

        The below line is there for the session id to remain same, to track the user
        req.session.visited = true; 

        res.cookie("hello", "world", {maxAge : 60000 * 60 * 2, signed : true})
        res.status(200).send({msg : "Welcome to the Homepage"})
    })

    //inside the get route of users
        //session data structure 
        req.sessionStore.get(req.session.id, (err, sessionData) => {
        if (err) {
            console.log(err)
            throw err
        }
        console.log(sessionData)
        })
