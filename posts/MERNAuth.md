---
title: 'MERN with Auth Pt. 1'
author: 'Tim Gentry'
shortDesc: "Part 1 "
date: "Jun 29"
---
1. Introduction & Express Setup

This is an intermediate-level tutorial on building a full stack JavaScript application with user authentication and authorization using the MERN stack. The objective is to fill the void

between the vast quantity of beginner-level tutorials, which only explains the basics, and commercial, professional-level lessons that may be too complicated or large in scope, and are infrequently showcased with step-by-step instructions. 

To proceed, you should already have a basic understanding of how the web works, HTML, CSS, CSS Frameworks, modern JavaScript, Node and React. A rudimentary understanding of Redux, Express and non-relational databases would be helpful, but is not required. We will briefly cover styling the React UI, as plenty of beginner tutorials already exist for that.

First, we will create a backend using Node and Express, connect our server to a MongoDB Atlas database, then construct a frontend using React, Bootstrap, React Router, Redux, and Axios. Finally, we will deploy the application on Heroku and Netlifly.

Along the way, we will use many other plugins from NPM (or Yarn if you prefer), and cover full CRUD operations for Creating/Reading/Updating/Deleting documents and users - using JWT’s to sign users in and out after hashing their passwords, protecting routes, and much more.

We will build a gardening app which we will call “Gardenly.” The app allows users to create a garden filled with unique plants with their own unique data. The framework of this application can be used and expanded to fit nearly any purpose or use case where entities of any type must be stored, edited, and served.

Our journey begins by creating a main app folder and naming it Gardenly. Inside the main folder, create backend and frontend subfolders. We will start in the backend subfolder, by initializing an NPM project with npm init -y, then installing and importing Express and Nodemon (dev dependency), creating an index.js, and constructing an app variable using express().

```js
const express = require("express")

const app = express()
```

The app can now be used as our express server for processing and responding to requests.

```js
app.get("/", (req, res) => {
  //req is the request sent to the server
  //res is the response sent back to the client
})
```

At the bottom of index.js, we must listen to a port using app.listen() - the first parameter being a port, and the second parameter being an optional message for console logging that your server is running:

```js
const PORT = 5000
app.listen(PORT, console.log(`Server is running on port: ${PORT))
```

Then in terminal, navigate to the backend folder and run node index.js. Now the server should run and you will see your console.log message of the current port. 

If you are sending a welcome message as your server response to get requests to the root ‘/‘, you should see this message when navigating to localhost:5000/.

```js
app.get('/', (req, res) => {
  res.send("Welcome to the express backend API!")
  //Whenever a get request is made to /, the server responds (res) by sending the "Welcome" message
})
```
2. Connecting Express to MongoDB

Mongoose is a package that allows our express server to easily interact with MongoDB.

First, install Mongoose and a package called Dotenv:

```js
npm i mongoose dotenv
```

Next, go to the MongoDB Cloud Atlas site. Register, sign in, create a free database, and build a cluster. (This step takes a while for free clusters. There are plenty of tutorials covering this sign up process).

Once the cluster is completed, click connect, and add your IP address to the whitelist.

Then, create a user for your database (This will essentially be the first dummy-user-admin that we use to add dummy-data, since we have to start somewhere. Remember the username and password you choose, or you’ll have to repeat this step!)

Next, create a .env file at the root of your backend. This file is used to store environment variables, including secret keys that you do not want publicly available. 

Create a connection string (MongoDB\_URI) in the .env file and replace the password credential with your own from the dummy-admin, then rename the database by changing “myFirstDatabase” in the URI to whatever name you want.

Back in index.js, use Mongoose to begin connecting to MongoDb by using mongoose.connect() and passing it the connection string (URI), and optional connection options. Chain on a .then() so that you can console.log a successful connection message, and also chain on a .catch() in order to catch and log errors.

```js
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connection to MongoDB Database successful"))
    .catch((error) => {
        console.error("MongoDB connection failed", error.message)
    })
```

Now, when you run the server (with 'npm run dev') you should see your success message displayed in the console that the MongoDb connection was successfully established! The application is now connected to MongoDB using Mongoose.
3. Mongoose Schemas and Models

Start by making a folder at the root of the backend for models, and creating a file for each model you’d like to create. (Examples: plant.js or person.js)

**
**

To create a Mongoose model, first define a Mongoose schema. A schema specifies the structure of a “document.” NoSQL databases such as MongoDB differ significantly from SQL databases, in that rather than tables, MongoDB keeps data in “collections” of “documents” that more closely resemble files stored in a folder.

**
**

To create a schema, import Mongoose and create a new const with new mongoose.Schema() , which takes as its parameter an object containing all of the properties of whatever you are trying to model. Properties can be whatever you choose to best describe and store the data. Each property can be passed an object with further options and conditions, but you must at least assign a data type (String, Boolean, Date, etc.).

Example:

```js
const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200
    },
    author: {
        type: String
        minlength: 2,
        maxlength: 200
    },
    species: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 300
    },
    growingZone: {
      type: Number,
      required: true
    }
    uid: {
        type: String
    },
    isInGarden: {
        type: Boolean
    },
    date: {
        type: Date,
        default: new Date()
    }
})
```

The structure of the ‘document’ that will be stored in MongoDB has now been defined, and can be used to create new instances of the model.

**
**

Next, we will build the model itself. The model uses the schema to directly interact with the database. Set a new const, named as a capitalized version of your schema name, and assign it to mongoose.model() , which takes two parameters. The first parameter is a string that will be pluralized into the name of the collection, but must be entered in singular form. The second parameter is the schema we just created.

Example:

```js
const Plant = mongoose.model('Plant', plantSchema)
```

Finally, export the model:

```js
exports.Plant = Plant
```

The exported model will be used in our routes.

4. Backend Middleware

Back in index.js, import CORS to prevent cross origin errors, and use it as middleware like so:

```js
app.use(cors())
```

Next is a middleware that is built into express will allow us to pass JSON in the body of our server request objects:

```js
app.use(express.json())
```

More detail on middleware will be provided in future chapters. For now, think of middleware as ‘adapters’ of sorts.
5. Routes and POST Requests

Now we will start adding routes. Begin by adding a routes folder to the root of your backend project. Inside it, add a file that is the plural form of your singular model (plant.js becomes plants.js, for example).

Within the route file, import the model(s) needed for the route from the schema/model file (henceforth known as simply the model), using the correct import method for whatever export method was used.

In your new plants.js route file, import Express, and create a router (sort of like a mini app inside of the Express app). Router is also built into Express. 

Example:

```js
const { Plant } = require("../models/plant") //Model imported using destructuring
const express = require("express")

const router = express.Router()  //Creating the express router for our api endpoint.
```

We are now ready to start adding API endpoints using our router. It works similar to `app.get()`, except it is `router.get``()`.

We are now ready to start adding API endpoints using our router. It works similar to app.get(), except it is router.get(). 

**
**

To make a post request, create a variable to store the particular ‘document' you want to post, and assign it to a new instance of the Plant model you imported.

**
**

This new instance of the Plant model, when invoked, takes an object of properties that are identical to the properties in that model’s schema, but has the specific details for that particular document/item. (Example: SusansFicus vs plant). 

**
**

The specific details of the future document’s data is acquired from the request body (req.body).

Example:

```js
router.post('/', (req, res) => {
  let plant = new Plant({
    name: req.body.name,
    author: req.body.author,
    isInGarden: req.body.isInGarden
  })
})
```

You could also choose to extract the properties using destructuring, in order to keep the code more DRY. (Don’t Repeat Yourself)

```js
const { name, author, isInGarden, date, uid } = req.body
```

Next, save the document to the database.

The imported model contains a simple Save method, thanks to Mongoose. Saving to MongoDb is easy - invoke the .save() method from the new instance of the model you have created.

Note that this will be an asynchronous operation, so using async/await within a try/catch block is necessary. (You could also use .then())

```js
try {
  
  plant = await plant.save()
  res.send(plant)
  
} catch(error) {
  console.log("Error posting plant.", error.message)
  res.status(500).send(error.message)
}
```

Finally, export the router.

```js
module.exports = router
```

Back in index.js, import your route. Then, under your other middleware, add another `app.use()` - which essentially acts as a middleware function. The first parameter is the API path, and the second parameter is the 'mini-app' router.

Example:

```js
app.use("/the/api/path", theRouter)
```

To test API routes, use the Postman app.

Through Postman, making a GET request to the standard “/“ API endpoint will return your welcome message. Making a POST request with modeled JSON data should successfully save a document to your MongoDB Atlas database.

6. Data Validation Using JOI

Joi is needed as extra validation because sometimes the data we get from the client is not the same as the data we save to the database (manipulation will occur). Joi schemas are created within the route endpoints.

First, install and import Joi.

Next, create a Joi schema. It is very similar to a Mongoose schema used for creating models, and contains all of the properties that should be saved to MongoDb. It allows you to set additional validation and constraints.

To use Joi:

```js
const Joi = require('joi')

const schema = Joi.object({
       name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isInGarden: Joi.boolean(),
        date: Joi.date()
        //Here you can set things like min, max, patterns, types, and many more for each of the properties that belong to the document
})
```

Next, call the .validate() method attached to the schema.

```js
const { value, error } = schema.validate(req.body)
```

The schema.validate() method is passed the request body data (you could also destructure specific data from the req.body). It returns a value and an error that you can destructure, which can be destructured out as well. The value will generally be whatever is sent from Postman or our yet-to-be frontend, and error, of course, will display any errors. 

We are only interested in errors. If an error exists, we want to terminate by returning a response status of 400 (bad client request) along with the error message. Unfortunately, Joi uses a somewhat convoluted error message structure, but can be found as follows:

```js
const { error } = schema.validate(req.body)

if (error) return res.status(400).send(error.details[0].message)
```
7. Handling GET Requests

Previously we set up our API endpoint for posting documents to the database. Now we will handle getting documents from the database. We will then have accomplished the Create and Read aspects of basic CRUD operations.

**
**

In the route file, above our post request code, create a new function using router.get() . The first parameter should be the endpoint URL. The second parameter is an async function, where we have access to request and response. Inside our async function, we will once again use the Mongoose model that was imported for our other API request. This time we will use its attached .find() method, which will find all the documents in our database (an asynchronous action that must be awaited).

Finally, the documents can be sent by using res.send() and the variable containing them.

```js
router.get('/', async (req, res) => {
  const plants = await Plant.find()
  res.send(plants)
})
```

Note: For more complex database queries, you can use .find() parameters to get back filtered data. Filter using your specific property. You can also limit the number of documents returned, sort their order, etc. There are many possible comparison operators, and it is possible to write complex requests to filter your database

queries.

**
**

Note: Since this is an asynchronous operation, don’t forget to wrap the async code inside of a try/catch block and handle errors.

8. Handling DELETE Requests

For the ‘Delete’ aspect of our CRUD functionality, we will create an API endpoint for handling deleting documents. Once again, begin by creating a new router function within your routes, this time at the end of the file and using router.delete(). As before, the first parameter is the targeted endpoint and the second parameter is an async function that will contain our deletion logic.

**
**

There are several methods of deletion available. deleteOne() will find and delete a single document from the database, deleteMany() removes multiple documents at a time, and findByIdAndDelete() finds a document by its ID and removes it.

All of these methods are attached to the model imported from your models folder. So, for example:

```js
const deletedDocument = await YourModel.deleteOne({
  isComplete: true
})
res.send(deletedDocument)
```

The above code would delete the first document in the database it encounters with “isComplete” set to true. The deletedDocument constant will contain information about the number of documents that were deleted, along with document details. Since it is asynchronous, it also needs to be wrapped in a try/catch block to handle errors.

.deleteMany() works similar to .deleteOne() - the difference being that it will delete all documents that match the specified filter parameters.

.findByIdAndDelete() is used most often, because deleting by ID is a very safe way of finding documents. In order to get the ID, you must modify the first parameter of router.delete(). To do this, include the ID (the full colon tells Express that the ID will be different, depending on the document). Now the ID will be stored inside req.params.

The router for handling delete requests now looks like this:

```js
router.delete('/:id', (req, res) => {
  try {
    const deletedDocument = await Plant.findByIdAndDelete(req.params.id)
    res.send(deletedDocument)
    
  } catch(error){
    res.status(500).send(error.message)
    console.log(error)
  }
})
```

Information about the deleted document(s) is sent back to the client (res.send()) so the client can update its state and change the UI view to represent the change in the database.

9. Handling PUT Requests

PUT is one of the two methods you can use to update documents (the other being PATCH). We will again begin by creating a new router function with router.put(). It will take the unique ID in its URL endpoint for the first parameter, similar to the previous delete request. Then, its second parameter will be an async function in which the PUT request logic goes. (You should be starting to see a pattern here!) 

**
**

PUT requests essentially replace the existing document with a new one, with updated data.

Since a Put request involves getting data from the client (similar to the post request from earlier) we will again be using Joi to validate the client data.

```js
const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isInGarden: Joi.boolean(),
        date: Joi.date()
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)
```

The Joi validation is in fact exactly the same.

**
**

Next, we need to ensure that the document we are trying to modify actually exists in the database. This is accomplished by:

```js
const plant = await Plant.findById(req.params.id)

if (!plant) return res.status(404).send("Plant/Whatever type of document you were trying to modify does not exist in the database.")
```

If the document does exist, this if statement will not fire and we will continue on.

Next, much the same way that we posted a new plant, we need to build a new version with the updated data. First, destructure the old data from the request body:

```js
const { name, author, isInGarden, uid, date } = req.body
```

Then, create a constant for the updated document, using the imported model’s .findByIdAndUpdate() method. It takes three parameters, first being the ID (req.params.id), the second being an object containing the data, and the third is an object letting Mongoose know that we want the new, updated version of the document back. Finally, the updated document is sent to the client, and everything is wrapped inside a try/catch block.

The final PUT request looks like this:

```js
router.put('/:id', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isInGarden: Joi.boolean(),
        date: Joi.date()
    })

    const { error } = schema.validate(req.body)

    if (error) return res.status(400).send(error.details[0].message)

    try {
        const plant = await Plant.findById(req.params.id)

        if (!plant) return res.status(404).send("Plant does not exist in the database.")

        const { name, author, isInGarden, uid, date } = req.body
        const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, {
            name,
            author,
            isComplete,
            uid,
            isInGarden,
            date
        }, { new: true })
        res.send(updatedPlant)

    } catch (error) {
        res.status(500).send(error.message)
        console.log("Error updating plant with PUT request", error)
    }
})
```

10. Handling PATCH Requests

PATCH is one of the two methods used to update documents (PUT can also be utilized). Create a new router function with router.patch(). It will take the ID as the URL endpoint as its first parameter, similar to the previous delete request. Its second parameter will be an async function, where the PATCH request logic will go.

```js
router.patch('/:id', async (req, res) => {
    const yourThing = await YourThing.findById(req.params.id)

    //Do stuff here
})
```

We check to make sure the document actually exists before we try to modify it, similar to the PUT request:

```js
    if (!YourThing) return res.status(404).send("YourThing does not exist in the database.")
```

Next, .findByIdAndUpdate() is used to actually update the document. The first parameter is the ID of the document from req.params.id (This is the ID from the endpoint URL ‘/:id’). The second parameter is the properties of the document that you wish to edit. Usually there will be one PATCH request for each type of data mutation you want to allow. For example:

```js
//Switches the "isCompleted" property on the document to the opposite of whatever it is -
//(true to false, false to true)
Plant.findByIdAndUpdate(req.params.id, {
  isCompleted: !yourThing.isCompleted
})
```

We can then send the updated document back to the client with res.send() . The completed PATCH request looks like this:

```js
router.patch('/:id', async (req, res) => {
    //Toggles isInGarden
    try {
        const plant = await Plant.findById(req.params.id)

        if (!plant) return res.status(404).send("Plant does not exist in the database.")

        const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, {
            isInGarden: !plant.isInGarden
        })
        res.send(updatedPlant)

    } catch (error) {
        res.status(500).send(error.message)
        console.log("Error updating plants garden status with PATCH", error)
    }
})
```
11. CRUD Operations

Now, all CRUD operations are complete. Here is an example of CRUD operations for plants routes in our Gardenly app. Code comments have been added to several important lines throughout, to better explain what is happening at each step of the process:

```js
const { Plant } = require("../models/plant") //Importing the model
const express = require("express")
const Joi = require("joi")

const router = express.Router()  //Creating our router "mini app"

router.get('/', async (req, res) => { //Our get request to get all documents from database
    try {
        const plants = await Plant.find()  //using .find() from the Plant model to get all the plants
        res.send(plants)  //sending the plants to the client

    } catch (error) {  //error handling
        res.status(500).send(error.message)
        console.log("Error getting plants from database:", error)
    }

})

router.post('/', async (req, res) => {  //Our post request to post a new document to the database
    const schema = Joi.object({  //Joi validation of client side inputs
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isInGarden: Joi.boolean(),
        date: Joi.date()
    })
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message) //End of Joi input validation

    const { name, author, isInGarden, uid, date } = req.body  //destructuring from the request body

    let plant = new Plant({  //creating a new instance of a Plant with its schema values filled in
        name,                //using client inputs
        author,
        isInGarden,
        uid,
        date
    })

    try {
        plant = await plant.save() //saving the new plant to the database
        res.send(plant)   //sending the new plant to the client
    } catch (error) {
        res.status(500).send(error.message)
        console.log("Error posting plant", error)
    }
})

router.put('/:id', async (req, res) => {  //Our put request which replaces an old document with a new version
    const schema = Joi.object({   //Joi validation of client input
        name: Joi.string().min(3).max(200).required(),
        author: Joi.string().min(3).max(30),
        uid: Joi.string(),
        isInGarden: Joi.boolean(),
        date: Joi.date()
    })
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    try {
        const plant = await Plant.findById(req.params.id)  //finding a plant by the id in the url

        if (!plant) return res.status(404).send("Plant does not exist in the database.")

        const { name, author, isInGarden, uid, date } = req.body  //destructuring from the request body
        const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, {  //creating a new, updated plant
            name,
            author,
            uid,
            isInGarden,
            date
        }, { new: true })  // the { new: true } object param ensures the updated one is returned
        res.send(updatedPlant)  //updated plant is sent to client so that the UI can be updated to match database

    } catch (error) {
        res.status(500).send(error.message)
        console.log("Error updating plant with PUT request", error)
    }
})

router.patch('/:id', async (req, res) => {  //Our patch request which changes a specific property of the document
    //Toggles isInGarden
    try {
        const plant = await Plant.findById(req.params.id)  //document is found by its id

        if (!plant) return res.status(404).send("Plant does not exist in the database.")  //handling no document case

        const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, {  //creating a constant for updated plant
            isInGarden: !plant.isInGarden  //toggling/changing/setting a specific property
        })
        res.send(updatedPlant)  //sending the updated plant to the client in order to update UI

    } catch (error) {
        res.status(500).send(error.message)
        console.log("Error updating plants garden status with PATCH", error)
    }
})

router.delete('/:id', async (req, res) => { //Our Delete request for deleting documents from the database
    try {
        const deletedPlant = await Plant.findByIdAndDelete(req.params.id)  //finding and deleting the document by its ID
        res.send(deletedPlant) //sending the deleted plant to the client to update UI

    } catch (error) {
        res.status(500).send(error.message)
        console.log("Error deleting plant", error)
    }
})

module.exports = router  //Exporting the router for use in the main index.js of the backend, where it will be used as middleware with app.use().
```
12. User Authentication & User Model

Authentication is one of the more difficult aspects of creating basic software applications. There are many different strategies, each with different pros and cons.

**
**

We will take the approach of using JSON Web Tokens (JWT’s), kept in local storage. We will:

* create a user model and an endpoint to handle signing up
* hash their chosen password
* create a sign in endpoint
* protect our API endpoints by creating our own auth middleware. Sign up and sign in endpoints will then be our public-facing API endpoints, whereas our CRUD operation endpoints will all be protected (private) endpoints.

**
**

First, install Bcrypt for password hashing: npm i bcrypt

We will start by creating a new model for users. Begin by importing Mongoose, then create a userSchema, which is an object coming from the new Schema class available in Mongoose:

```js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({})
```

A schema represents the structure or the ‘shape’ of the document. Thus, the schema is passed an object with properties for the user. Our user will need properties for name, email, and password:

```js
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    }
})
```

Next, we will create a new endpoint route for signing up users. In the routes folder, create a new file signUp.js, and import the User model, Express, Bcrypt, and Joi. Create a new router ‘mini app’ using Express:

```js
const User = mongoose.model('User', userSchema)
```

Export the User model, and you can now utilize it to create new users within other files.

```js
exports.User = User
```

Next, we will create a new endpoint route for signing up users. In the routes folder, create a new file signUp.js, and import the User model, Express, Bcrypt, and Joi. Create a new router ‘mini app’ using Express:

```js
const { User } = require('../models/user')  //Note how user is destructured from the exports object
const express = require("express")
const Joi = require("joi")

const router = express.Router()
```

To sign up new users to this application, we will first do user input validation using Joi. Once we know that the input is valid, we will check whether the user already exists. If the user does not already exist, we will create the new user with our imported User model, hash the password using Bcrypt, save the user to the database, and update the client.

For Joi validation, we will create a Joi schema - by creating a constant and assigning it to Joi.object({}), which takes an object filled with the same properties as the Mongoose model. Then, these properties can be validated using Joi methods like so:



```js
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(6).max(200).email().required(),
        password: Joi.string().min(6).max(1024).required()
    })
```

We will then check for an error by destructuring it from schema.validate(). The function .validate() is passed the request body and compares it to the schema. (You could also destructure out a value, but we are only interested in the error).

```js
  const { error } = schema.validate(req.body)
```

Finally, we will wrap up our Joi validation by checking if an error exists. If an error does exist, we will return a response status of 400 (bad client request), terminating operations in our route, and we will send the error message details to the client:

```js
  if (error) return res.status(400).send(error.details[0].message)
```

Joi validation for user sign-in client data is now complete.

Next, we need to check if a user already exists by using the .findOne() method, attached to the User model as a filter. We will filter by email, because we require each email address to be unique. Just like with Joi validation, we will get our client data from the request body. This operation is also asynchronous, so we will await its result, assign it to a variable ‘user’ and wrap our logic in a try catch block with error handling.

**
**

Finally, if a matching user is found, we will terminate operations by sending back a response status of 400 and sending a message that a User with the given email already exists:

```js
  try {
      let user = await User.findOne({ email: req.body.email })
      if (user) return res.status(400).send("A user with the given email already exists.")
        
  } catch (error) {
      res.status(500).send(error.message)
      console.log("Error signing up a user", error)
  }
```

We are now validating the user input, ensuring the user does not already exist, and handling errors. It is time to add new users to the database!

We will begin by once again destructuring the properties of the user from the request body, to make our code more DRY.

```js
  const { name, email, password } = req.body
```

We then create a new user with our User model and the properties from the req.body.

```js
 let user = new User({
            name,
            email,
            password
  })
```

Next, we must hash the password using Bcrypt. Import Bcrypt at the top of signUp.js within routes, then, under where we create a new user, we will generate a salt.

Salt is a random string of characters that helps to make passwords unique. Set a const ‘salt’ and await bcrypt.genSalt(10), which is asynchronous and ten is the default parameter:

```js
const salt = await bcrypt.genSalt(10)
```

The next step is to hash the password. This is done with bcrypt.hash(), which takes two parameters. The first is the user password from the client, accessible through user.password. The second parameter is our salt. This will return a very long string of characters, which we then set to be the new user.password:

```js
user.password = await bcrypt.hash(user.password, salt)
```

Finally, we save the new user to the database using the .save() method attached to the User model. It is an async action, so we will await it.

```js
await user.save()
```

We will eventually send a token containing user details to the client on the front end. For now, since there is no front end, when a user is successfully created we will send a very simple response message of “User created."

```js
  res.send("User created")
```

Finally, export the module.

```js
module.exports = router
```

The module will be imported to index.js. The router will act as a middleware with app.use(), which takes the sign up API endpoint as well as the imported signUp route, similar to the first route we set up to get documents.

```js
app.use('/api/signup', signUp)
```

At this point, it is important to test that the signup route is working correctly using Postman. Inside of Postman, create dummy user data and make a post request while your server is running. If the request was successful, you will get a “User created” response back, and a user with that dummy data will be added to your MongoDB Atlas database inside a new collection “users.” Also check that inside of MongoDb, the newly created user’s password has been properly hashed (It will look like a long string of random characters, rather than the password you came up with).

It is also wise to check Joi validation now, by using Postman to try submitting a dummy user with invalid data, such as a name or password that is too short, or entering an invalid email address.

13. Sign Up

Next, we will create a new endpoint route for signing up users. In the routes folder, create a new file signUp.js, and import the User model, Express, Bcrypt, and Joi. Create a new router ‘mini app’ using Express:

```js
const { User } = require('../models/user')  //Note how user is destructured from the exports object
const express = require("express")
const Joi = require("joi")

const router = express.Router()
```

To sign up new users to the application, we will conduct user input validation using Joi. Once we know the input is valid, we will check if the user already exists. If the user does not already exist, we will create the new user with our imported User model, hash the password using Bcrypt, save the user to the database, and update the client.

For Joi validation we will create a Joi schema, by creating a constant and assigning it to Joi.object({}) - which takes an object filled with the same properties as the Mongoose model. Then, these properties can be validated using Joi methods like so:

```js
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(6).max(200).email().required(),
        password: Joi.string().min(6).max(1024).required()
    })
```

Check for an error by destructuring it from schema.validate() next. The function .validate() is passed the request body and compares it to the schema. (You could also destructure out a value, but we are only interested in the error).

```js
const { error } = schema.validate(req.body)
```

Finally, we will wrap up our Joi validation by checking if an error exists. If an error does exist, we will return a response status of 400 (bad client request), terminating operations in our route, and we will send the error message details to the client:

```js
if (error) return res.status(400).send(error.details[0].message)
```

Joi validation for user sign in client data is now completed.

Next, we need to check if a user already exists by using the .findOne() method attached to the User model as a filter. We will filter by email, because we set a requirement for email addresses to be unique. Just like in Joi validation, we will get our client data from the request body. This operation is also asynchronous, so we will await its result, assign it to a variable ‘user’ and wrap our logic in a try catch block with error handling.

```js
  try {
      let user = await User.findOne({ email: req.body.email })
      if (user) return res.status(400).send("A user with the given email already exists.")
        
  } catch (error) {
      res.status(500).send(error.message)
      console.log("Error signing up a user", error)
  }
```

We are now validating the user input, ensuring the user does not already exist, and handling errors. It is time to add new users to the database!

We will begin by once again destructuring the properties of the user from the request body, to make our code more DRY.

```js
  const { name, email, password } = req.body
```

We then create a new user with our User model and the properties from the req.body.

```js
 let user = new User({
            name,
            email,
            password
  })
```

Next we must hash the password using Bcrypt. Import Bcrypt at the top of signUp.js within routes, and then, under where we create a new user, we will generate a salt.

Salt is a random string of characters that helps make passwords unique. Set a const ‘salt’ and await Bcrypt.genSalt(10), which is asynchronous and 10 is the default parameter:

```js
const salt = await bcrypt.genSalt(10)
```

The next step is to hash the password. This is done with bcrypt.hash(), which takes two parameters. The first is the user password from the client, accessible through user.password. The second parameter is our salt. This will return a very long string of characters, which we then set to be the new user.password:

```js
user.password = await bcrypt.hash(user.password, salt)
```

Finally, we save the new user to the database using the .save() method attached to the User model. It is an async action so we will await it.

```js
await user.save()
```

We will eventually send a token containing user details to the client on the front end. For now, since there is no front end, when a user is successfully created we will send a very simple response message of “User created."

```js
res.send("User created")
```

Finally, export the module.

```js
module.exports = router
```

The module will be imported to index.js, and the router will act as a middleware with app.use(), which takes the sign up API endpoint as well as the imported signUp route, similar to the first route we set up to get documents.

```js
app.use('/api/signup', signUp)
```

At this point, it is important to test that the signup route is working correctly using Postman. Inside of Postman, create dummy user data and make a post request while your server is running. If the request was successful, you will get a “User created” response back, and a user with that dummy data will be added to your MongoDB Atlas database inside a new collection “users.” Also check that inside of MongoDb, the newly created user’s password has been properly hashed (It will look like a long string of random characters, rather than the password you came up with).

It is also wise to check Joi validation now, by using Postman to try submitting a dummy user with invalid

data, such as a name or password that is too short, or an invalid email address.

14. Sign In

Now that we have a route for signing up users, we must give users a way to sign in. To do this, we will create a new ‘signIn' route. Within that route, we will use Joi to validate client data, and check to see if the user exists. If the user does exist, we will validate their password, then generate a JWT to send to the client. This tells the client that a user is now logged in.

**
**

Start with the same imports as the signUp route. We will also need to install the JSON webtoken module: npm i Jsonwebtoken

```js
const { User } = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const express = require("express")
const Joi = require("joi")

const router = express.Router()

router.post('/', async (req, res) => {})
```

First, the Joi validation:

```js
    const schema = Joi.object({
        email: Joi.string().min(6).max(200).email().required(),
        password: Joi.string().min(6).max(1024).required()
    })
    const { error } = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
```

Next, we will check to see if the user exists:

```js
  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Invalid email or password, or user does not exist.")
```

It is important to remain rather vague while still describing the error, for security purposes.

We then use Bcrypt to compare the password that the client has sent (req.body.password) with the password stored in the user.password in our database. Req.body.password is plainText, whereas user.password is a variable in our database.

As a result of the async operation comparing the passwords, the validPassword variable will be either true or false. True if the passwords match, false otherwise. If the result is false and the password is invalid, we will return a 400 server error - terminating our code, and send an error response to the client.

```js
const validPassword = await bcrypt.compare(req.body.password, user.password)
if (!validPassword) return res.status(400).send("Invalid email or password, or user does not exist.")
```

We have finished Joi validation, checked that the user exists, and ensured that their password is correct. It is time to sign in the user using JWT.

**
**

We begin by using jwt.sign() to create a new token, and passing it two parameters. The first parameter is a payload object, which will contain as its parameters the data we want our token to have:

```js
  jwt.sign({
            _id: user._id,  //note: user._id is automatically generated by mongodb when a new user is created
            name: user.name,
            email: user.email
  })
```

Note that we do not send the password to the client!

The second parameter is a secret key, to make our token more secure. The secret key must be stored in an environment variable. Never upload environment variables to whatever version control system you might be using (such as GitHub). You will need to add an .env file, and ensure that it is also included in your .gitignore file.

Create a SECRET\_KEY variable in your .env file. The secret key should be a longish, random string of characters (You can go wild on your keyboard, but no spaces!) Then, back in signIn.js in your routes folder, create a constant called secretKey. In order to access it securely:

```js
  const secretKey = process.env.SECRET_KEY
```

Next, we can send the token to the client as our server response, to let the client side know that the user is now signed in on the back end:

```js
  const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email
        }, secretKey)
```

Now we can send the token to the client as our server response, in order to let the client side know that the user is now signed in on the back end:

```js
res.send(token)
```

The token will be used to secure routes, and allow/deny access to certain app features.

Export the router module:

```js
module.exports = router
```

In index.js, once again, we need to include the new route as a middleware:

```js
const signIn = require('./routes/signIn')
 //
 
 // ...
 
 //
app.use('/api/signin', signIn)
```

Now, test sign in functionality using Postman.

If your sign in route is working correctly, when you send a post request to /api/signin with a JSON body containing a valid email and password in the database, you should get back a JWT from the server as a response. The JSON Web Token (JWT) contains a header, a payload which now holds the ID, name, email, timestamp of when the token was generated, and finally a signature which makes the token secure. The token can now be used on the front end to allow or disallow certain features.

It is also worth testing your validation logic, just as you did with signing up new users.

Finally, we want to add functionality to sign in users automatically after they have registered. To do this, copy the sign in functionality from the signIn route, and add it to the signUp route after awaiting user.save(). Instead of the simple initial res.send(“User created”) message we were responding with earlier, we are now

sending the token to the client as our server response:

```js
        await user.save()

        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email
        }, secretKey)

        res.send(token)
```

Back in Postman, test signing up a new user again. If our modification was successful, you should get back a JWT when signing up a new user. This JWT will contain a payload of the new user’s data, and the new user will be added to the MongoDb database.

15. Protecting Routes / API Endpoints

Now that sign up and sign in functionality is working, it is time to protect user-login specific API endpoints and app functionality.

To start, create a folder at the root of the backend called middleware, to hold our auth middleware. Within middleware, create a new file called auth.js.

Within auth.js, we will create a middleware function, and determine whether the user is logged in by checking if a token exists, if a token exists we will verify that it is valid, and if it is, we will pass functionality to the next middleware function with next(). A middleware function is simply a function that has access to request, response, and next. These functions are able to manipulate the body of the request, and can send a response back to the client. They can also pass functionality to the next middleware function.

```js
function auth(req, res, next) {}
```

For our authorization middleware, we must first verify that a token exists by reading the request header. When sending a request, we will include a key and a value in the header, where the key is ‘x-auth-token’ and the value is the token itself. If the token does not exist, we return a status of 401 “Not authorized” (terminating the code) to the client.

```js
    const token = req.header("x-auth-token")
    if (!token) return res.status(401).send("Not authorized.")
```

Now that we know the token exists, we must verify it with JSON webtoken. This is done by using jwt.verify() and passing it the token along with the secretKey from your .env file.

**
**

jwt.verify() will return the payload of the JWT token, if the token is valid. We will store the result in a constant called ‘payload.’ The payload can then be attached to the request like so:

```js
const secretKey = process.env.SECRET_KEY
const payload = jwt.verify(token, secretKey)
req.user = payload
```

The payload contains the details of our user. We have successfully verified the token, and we can pass functionality on to our next middleware function with next(). If this fails, the token is not valid, and we should handle the error in a catch block by sending a 400 server error and the message “invalid token” to the client. Finally, export the auth middleware.

The middleware is imported into index.js, where we can use it on our endpoints by including it as a parameter on routes we want to protect. By doing so, we ensure that the auth middleware will run before the callback function, passed as an additional parameter in the routes.

```js
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) return res.status(401).send("Not authorized.")

    try {
        const secretKey = process.env.SECRET_KEY
        const payload = jwt.verify(token, secretKey)
        req.user = payload
        next()
    } catch (error) {
        res.status(400).send("Invalid token")
    }
}

module.exports = auth
```

Once again, it is important to test in Postman. First, attempt to log in a valid user in order to get a JWT. Once you have the token, copy it and perform a GET request to an endpoint with auth added. When performing the request, you should get a not authorized error from your middleware function, until adding a key-value pair to the header of the request (the key will be x-auth-token, the value will be the copied token).

**
**

Now, when the request is sent, you should have no error, and get data back from the database.

**
**

It is also important to test your validation by trying to send an invalid token, in which case you should get the response back that the token is invalid. For now, do not add auth to any routes, to make working on the frontend easier.

Now, we will switch from the backend to working on the frontend.

This concludes part 1! Stay tuned for part 2, in which we connect our backend Node app with a frontend React/Redux app!