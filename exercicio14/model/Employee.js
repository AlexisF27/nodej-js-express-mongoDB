const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:{
      type: String,
      required: true
    },
    age:{
      type: Number,
      required: true
    },
    city:{
      type: String,
      required: true
    },
    isStudent:{
      type: Boolean,
      required: true
    }
})

module.exports = mongoose.model('Employee', employeeSchema);
