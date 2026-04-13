const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// CREATE - Add a new student
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student Added Successfully', student });
  } catch (error) {
    res.status(400).json({ message: 'Error adding student', error: error.message });
  }
});

// READ - Get all students
router.get('/view', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error: error.message });
  }
});

// READ - Get single student by ID
router.get('/view/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error: error.message });
  }
});

// UPDATE - Update student by ID
router.put('/update/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student Updated Successfully', student });
  } catch (error) {
    res.status(400).json({ message: 'Error updating student', error: error.message });
  }
});

// DELETE - Delete student by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error: error.message });
  }
});

module.exports = router;
