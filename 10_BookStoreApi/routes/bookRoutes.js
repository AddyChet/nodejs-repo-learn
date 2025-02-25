import express from "express"
import { getAllBooks, getSingleBook, addNewBook, updateTheBook, deleteTheBook} from "../controllers/bookControllers.js"

//creates router
const router = express.Router()

router.get("/get", getAllBooks)
router.get("/get/:id", getSingleBook)
router.post("/add", addNewBook)
router.put("/update/:id", updateTheBook)
router.delete("/delete/:id", deleteTheBook)

export default router;