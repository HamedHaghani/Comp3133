
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  designation: { type: String },
  salary: { type: Number, required: true, min: 1000 },
  date_of_joining: { type: Date },
  department: { type: String },
  employee_photo: { type: String }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const Employee = mongoose.model('Employee', EmployeeSchema);
module.exports = Employee;
