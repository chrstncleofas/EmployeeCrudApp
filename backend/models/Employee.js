const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  country: String,
  accountType: String,
  username: String,
  lastName: String,
  firstName: String,
  email: String,
  contactNumber: String,
  photo: String,
});

module.exports = mongoose.model('Employee', EmployeeSchema);
