import mongoose, { Schema } from "mongoose";

const preferenceSchema = new Schema({
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
}, { versionKey: false });

const preferenceModel = mongoose.model('Preferences', preferenceSchema);

export { preferenceModel };
