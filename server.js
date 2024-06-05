const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://pp3662504:Prakash%4012@cluster0.kztmo7u.mongodb.net/mentor_student_assignment', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
    console.log("MongoDB Connected")
})


const Mentor = mongoose.model('Mentor', { name: String, email: String });
const Student = mongoose.model('Student', { name: String, email: String, mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' } });

app.use(bodyParser.json());

// Create Mentor
app.post('/mentors', async (req, res) => {
  try {
    const { name, email } = req.body;
    const mentor = new Mentor({ name, email });
    await mentor.save();
    res.status(201).json({message:"mentor created",mentor});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Read Mentor
app.get('/mentors',async(req,res) =>{
    try{
        const mentor = await Mentor.find();
        res.status(201).json({message:
"Mentor List",mentor
        })
    }catch(err){
      res.status(500).json({message:err.message})
    }
})
// Create Student
app.post('/students', async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = new Student({ name, email });
    await student.save();
    res.status(201).json({message:"student created",student});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Read Student
app.get('/students',async(req,res) =>{
    try{
        const student = await Student.find();
        res.status(201).json({message:"Student List",student});

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

// Assign a student to Mentor
app.post('/mentor/assign', async (req, res) => {
  try {
    const { mentor_id, student_id } = req.body;
    const student = await Student.findById(student_id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.mentor = mentor_id;
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add multiple students to a mentor
app.post('/mentor/:mentorId/add-students', async (req, res) => {
  try {
    const mentorId = req.params.mentorId;
    const { studentIds } = req.body;

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    const updatedStudents = [];
    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (!student) continue;
      if (!student.mentor) {
        student.mentor = mentorId;
        await student.save();
        updatedStudents.push(student);
      }
    }

    res.status(200).json(updatedStudents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all students without a mentor
app.get('/students-without-mentor', async (req, res) => {
  try {
    const students = await Student.find({ mentor: { $exists: false } });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Assign or Change Mentor for a particular Student
app.put('/student/:studentId/assign-mentor', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { mentorId } = req.body;

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.mentor = mentorId;
    await student.save();
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Show all students for a particular mentor
app.get('/mentor/:mentorId/students', async (req, res) => {
  try {
    const students = await Student.find({ mentor: req.params.mentorId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Show the previously assigned mentor for a particular student
app.get('/student/:studentId/previous-mentor', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const previousMentorId = student.mentor;
    if (!previousMentorId) return res.status(404).json({ message: 'Student has no previous mentor' });

    const previousMentor = await Mentor.findById(previousMentorId);
    res.json(previousMentor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
