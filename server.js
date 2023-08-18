const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskSchema = require("./module.js");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
mongoose
  .connect(
    "mongodb+srv://dhaneshreddy980:TaskApplication143@cluster0.qxac2kw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected"));
// Post Method
app.post("/addtask", async (req, res) => {
  const { todo } = req.body;
  try {
    const newData = new TaskSchema({
      todo: todo,
    });
    await newData.save();
    return res.json(await TaskSchema.find());
  } catch (e) {
    console.log(e);
  }
});
// Get Method
app.get("/gettask", async (req, res) => {
  try {
    return res.json(await TaskSchema.find());
  } catch (e) {
    console.log(e);
  }
});
// Delete Method
app.delete("/delete/:id", async (req, res) => {
  try {
    await TaskSchema.findByIdAndDelete(req.params.id);
    return res.json(await TaskSchema.find());
  } catch (e) {
    console.log(e);
  }
});
app.delete("/deleteall/", async (req, res) => {
  try {
    await TaskSchema.deleteMany();
    return res.json(await TaskSchema.find());
  } catch (e) {
    console.log(e);
  }
});
app.listen(3012, () =>
  console.log("Server Running...... http://localhost:3012")
);
