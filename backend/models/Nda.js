const mongoose = require('mongoose');

const ndaSchema = new mongoose.Schema(
  {
    ndaId: { type: String, required: true, unique: true, trim: true },
    ndaType: { type: String, trim: true },
    signerName: { type: String, trim: true },
    signerEmail: { type: String, required: true, lowercase: true, trim: true },
    partnerName: { type: String, required: true, trim: true },
    partnerEmail: { type: String, required: true, lowercase: true, trim: true },
    companyName: { type: String, trim: true },
    disclosingAddress: { type: String, trim: true },
    receivingAddress: { type: String, trim: true },
    notes: { type: String, trim: true },
    generatedDate: { type: String, required: true },
    expirationDate: { type: String, required: true },
    status: { type: String, default: 'pending', trim: true },
    signedAt: { type: String },
    revokedAt: { type: String },
    revokedBy: { type: String, trim: true }
  },
  { versionKey: false }
);

ndaSchema.index({ signerEmail: 1, generatedDate: -1 });

module.exports = mongoose.model('Nda', ndaSchema);
