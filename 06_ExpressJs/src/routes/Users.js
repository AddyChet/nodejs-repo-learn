import { Router } from "express";
import {
  query,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import { createUserValidationSchema } from "../../utils/createUserValidationSchema.js";
import { mockUsers } from "../../utils/mockData.js";

const Usersroute = Router();

//query param
// Usersroute.get(
//   "/api/users",
//   [
//     query("filter")
//       .isString()
//       .withMessage("Filter must be a string")
//       .isLength({ min: 3, max: 10 })
//       .withMessage("Filter must be within 3-10 characters"),
//     query("value").isString().withMessage("Value must be a string"),
//   ],
//   (req, res) => {
//     // if no filter and value
//     if (!req.query.filter && !req.query.value) {
//       return res.send(mockUsers);
//     }
//     //this query value will be passed into the request obj which has express validator as a key
//     const result = validationResult(req); // passing the request to the function to get proper errors in consol
//     //retunrs true if no errors, else returns false
//     if (!result.isEmpty()) {
//       return res.status(400).send({ errors: result.array() });
//     }
//     const { filter, value } = req.query;
//     if (filter && value) {
//       const filteredJson = mockUsers.filter((user) => user[filter].includes(value));
//       return res.send(filteredJson);
//     }
//   }
// );

Usersroute.get(
  "/api/users",
  [
    query("filter")
      .optional() // Validation applies only if "filter" exists
      .isString()
      .withMessage("Filter must be a string")
      .isLength({ min: 3, max: 10 })
      .withMessage("Filter must be within 3-10 characters"),
    query("value")
      .optional() // Validation applies only if "value" exists
      .isString()
      .withMessage("Value must be a string"),
  ],
  (req, res) => {
    //session data structure 
    req.sessionStore.get(req.session.id, (err, sessionData) => {
      if (err) {
        console.log(err)
        throw err
      }
      console.log(sessionData)
    })

    const allowedKeys = ["filter", "value"];
    const queryKeys = Object.keys(req.query);
    // Check for invalid query parameters
    const invalidKeys = queryKeys.filter((key) => !allowedKeys.includes(key));
    if (invalidKeys.length > 0) {
      return res.status(400).send({
        error: `Invalid query parameters: ${invalidKeys.join(
          ", "
        )}. Only "filter" and "value" are allowed.`,
      });
    }

    const result = validationResult(req);
    // If validation errors exist, return them
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { filter, value } = req.query;

    // If neither filter nor value is provided, return all users
    if (!filter && !value) {
      return res.send(mockUsers);
    }

    // If only one of "filter" or "value" is provided, return an error
    if (!filter || !value) {
      return res.status(400).send({
        error: "Both 'filter' and 'value' must be provided together.",
      });
    }

    // If both filter and value exist, perform filtering
    const filteredJson = mockUsers.filter(
      (user) => user[filter]?.includes(value) // Safely check if the key exists in the user object
    );

    return res.send(filteredJson);
  }
);

//POST request for USER
Usersroute.post(
  "/api/users",
  // using the below as a schema object
  checkSchema(createUserValidationSchema),
  /* 
  validation check for username*
    body("username")
    .notEmpty()
    .withMessage("Username cannot be Empty")
    .isString()
    .withMessage("Username has to be a String")
    .isLength({ min: 4, max: 32 })
    .withMessage("Username must be 4 - 32 chars long"),

  validation check for displayName
    body("displayName").notEmpty().withMessage("Display Name cannot be Empty"),
  */
  (req, res) => {
    const result = validationResult(req);
    console.log(result);

    //retunrs true if no errors, else returns false
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const data = matchedData(req); // gives me the santised data back --> similar to req.body object format
    // const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);
    return res.status(201).send("User added successfully");
  }
);

Usersroute.patch(
  "/api/users/:id",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).send({ msg: "user not found" });
    }

    const userIndex = mockUsers.findIndex((user) => user.id === parsedId);

    if (userIndex === -1) {
      return res.status(404).send({ error: "User not found" });
    }
    const data = matchedData(req);
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...data };
    return res.send({
      message: "User updated successfully",
      user: mockUsers[userIndex],
    });
  }
);

Usersroute.delete(
  "/api/users/:id",
  checkSchema(createUserValidationSchema),
  (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }

    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return res.status(400).send({ msg: "user not found" });
    }

    const userIndex = mockUsers.findIndex((user) => user.id === parsedId);

    if (userIndex === -1) {
      return res.status(404).send({ error: "User not found" });
    }

    mockUsers.splice(userIndex, 1);
    return res.status(200).send({ msg: "User info deleted successfully" });
  }
);

export default Usersroute;
