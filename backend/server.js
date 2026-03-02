
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./models/Student');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection (local for now — DevOps will containerize later)
mongoose.connect('mongodb://localhost:27017/studentdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// CREATE Student
app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});

// READ Students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.send(students);
});

// DELETE Student
app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send({ message: "Deleted Successfully" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
