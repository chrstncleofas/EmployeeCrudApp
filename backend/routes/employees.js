const express = require('express');
const router = express.Router();
const multer = require('multer');
const Employee = require('../models/Employee');

// Setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Route to create a new employee
router.post('/', upload.single('photo'), async (req, res) => {
  const newEmployee = new Employee({
    country: req.body.country,
    accountType: req.body.accountType,
    username: req.body.username,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    email: req.body.email,
    contactNumber: req.body.contactNumber,
    photo: req.file ? req.file.path : null,
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving employee data' });
  }
});

// Route to delete an employee by ID
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update an employee by ID
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const updatedData = {
      country: req.body.country,
      accountType: req.body.accountType,
      username: req.body.username,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      contactNumber: req.body.contactNumber,
    };

    // If there's a new photo, include it in the update
    if (req.file) {
      updatedData.photo = req.file.path;
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
