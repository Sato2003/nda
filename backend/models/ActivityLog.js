const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, trim: true },
    ndaId: { type: String, required: true, trim: true },
    ndaType: { type: String, trim: true },
    partnerName: { type: String, trim: true },
    partnerEmail: { type: String, lowercase: true, trim: true },
    signerEmail: { type: String, required: true, lowercase: true, trim: true },
    signerName: { type: String, trim: true },
    timestamp: { type: String, required: true },
    description: { type: String, trim: true }
  },
  { versionKey: false }
);

activityLogSchema.index({ signerEmail: 1, timestamp: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
