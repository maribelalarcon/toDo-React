const express = require("express");
const taskRouter = require("./routes/taskRouter");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();

mongoose.connect(
  "mongodb+srv://maribelsoledadalarcon:E1vBQRsSdSYCNynF@todo.8ms6oiv.mongodb.net/todo?retryWrites=true&w=majority"
);
app.use(express.json());
app.use(cors());

app.use("/tasks", taskRouter);

app.listen(8081, () => {
  console.log("Listen Server");
});
