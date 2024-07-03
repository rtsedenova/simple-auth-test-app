const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  _id: {type: Number, required: true},
  firsName: { type: String, required: true },
  lastName: { type: String, required: true },
  imageUrl: {type: String, required: true},
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
