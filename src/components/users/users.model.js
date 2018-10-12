import mongoose, { Schema } from "mongoose";

const accessDataSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { _id : false });

const personalDataSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: false
  },
}, { _id : false });

const userSchema = new Schema({
  status: {
    type: String,
    required: true,
    default: 'inactive',
    enum: ['active', 'inactive']
  },
  type: {
    type: String,
    required: true,
    default: 'client',
    enum: ['client', 'admin']
  },
  accessToken: String,
  accessData: {
    type: accessDataSchema,
    required: true
  },
  personalData: {
    type: personalDataSchema,
    required: false
  }
});

const userModel = mongoose.model('Users', userSchema);

export { userModel };
