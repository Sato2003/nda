const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    middleInitial: { type: String, trim: true, maxlength: 1 },
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, trim: true },
    role: { type: String, default: 'employee', trim: true },
    createdAt: { type: String, default: () => new Date().toISOString() }
  },
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);
