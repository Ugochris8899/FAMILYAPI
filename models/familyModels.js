const mongoose = require("mongoose");

// Define family schema
const familySchema = new mongoose.Schema({
  fatherName: {
    type: String,
    require: true
},
motherName: {
  type: String,
  require: true
},
children: {
  type: String,
  require: true
},
childrenImage: [{
  type: String,
  require: true
}],
    
  }, { timestamps: true });
  
  const FamilyModel = mongoose.model('Family', familySchema);

  module.exports = FamilyModel