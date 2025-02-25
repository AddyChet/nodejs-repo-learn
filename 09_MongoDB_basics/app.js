const mongoose = require("mongoose")

// connect with mongoDB
mongoose.connect('mongodb+srv://adarshbhandari1002:adarshbhandari10024@urlshorterner.edqcy.mongodb.net/?retryWrites=true&w=majority&appName=urlShorterner' ,
    {
        dbName : "SangamDB"
    }
)
.then(()=> console.log("Database conncected success"))
.catch((err) => console.log(err))

// This is a Schema ---> MODEL which defines what will be inside the database
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
  });

  //create user model
  const User = mongoose.model('User', userSchema)
  

  //creating the user
  async function runQueryExamples() {
    try {
        // const newUser = await User.create({
        //     name: "prajit",
        //     email: "prajit222@gmail.com",
        //     age: 227,
        //     isActive: true,
        //     tags: ["runnerrrrr"],
        // })

        // // another way to create
        // const newUser2 = new User({
        //     name: "anisha",
        //     email: "ayuarsh@gmail.com",
        //     age: 22,
        //     isActive: false,
        //     tags: ["lover"],
        // })

        // await newUser2.save()
        // console.log("new user created: ", newUser)
        // console.log("new user created: ", newUser2)

        //getting the all users

        // const allusers = await User.find({})
        // console.log(allusers)

        //getting users which matches the criteria
        // const isActiveFalse = await User.find({isActive : false})
        // console.log(isActiveFalse)

        // findOne always returns the first matched Data
        // const findOne = await User.findOne({name : "prajit"})
        // console.log(findOne)

        //selects the data we want from the db obj and - means exclude this
        // const selectedData = await User.find().select("name email -_id")
        // console.log(selectedData)

        //this limits the data to be 4 and skips the first one
        // const limitedUser = await User.find().limit(4).skip(1)
        // console.log(limitedUser)

        //sorts 1 = ascending -1 = descending
        // const sortedUsers = await User.find().sort({age : -1})
        // console.log(sortedUsers)

        // query: counts the number of documents that match filter
        const countDocs = await User.countDocuments({isActive : false})
        console.log(countDocs)

        //find user by ID
        const findbyId = await User.findById("67bbf8597bc701196efcec2f")
        console.log(findbyId)

        //delete user by ID
        const deleteUser = await User.findByIdAndDelete("67bbf8597bc701196efcec2f")
        console.log("deleted user ---> ", deleteUser)

        //update user --> set will set the key value pairs, new returns the new obj
        const updateUser = await User.findByIdAndUpdate("67bbf68e2f9d8ce17b886036", {
            $set : {age : 34, name : "Anisha", email :  "anisha@gmail.com"},
            $push : {tags : "Updated"}
            
        },{new : true})

        console.log("updated user --> ", updateUser )
    } catch (error) {
        console.log(error)
    }
    finally{
        //close the conncection
        await mongoose.connection.close()
    }
  }

  runQueryExamples()