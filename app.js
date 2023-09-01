const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

var id = 1;
let welcomeMessage = {
  id: id,
  from: "Ali",
  text: "Welcome to MigraCode chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//START OF YOUR CODE...

//read all messages
app.get("/messages", (req,res) => {
  res.send(messages);
});

//create a new message !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.post("/messages", (req, res) => {
  const newMessage = req.body;
  newMessage.id = messages.length + 1;
  messages.push(newMessage);
  res.status(201).send({
    message: "New message created successfully",
    data: newMessage,
  });
});

//Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
  const requestedId = req.params.id;
  const filteredById = messages.find((element) => element.id == requestedId);
  if (!filteredById){
    return res
    .status(404)
    .send(`The message with id number ${requestedId} was not found!`)
  };
  res.send(filteredById);
});

//Delete a message by ID
app.delete("/messages/:id", (req, res) => {
  const requestedId = req.params.id;
  const filteredById = messages.find((element) => element.id == requestedId);
  if (!filteredById){
    return res
    .status(404)
    .send(`The message with id number ${requestedId} was not found!`)
  };
  const findElementIndex = messages.findIndex((element) => element.id == requestedId);
  messages.splice(findElementIndex, 1);
  res.status(200).send(`The message with id number ${requestedId} was succesfully deleted.`);
});

//...END OF YOUR CODE

module.exports = app