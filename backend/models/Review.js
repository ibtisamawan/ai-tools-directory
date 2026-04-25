const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  toolId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tool', required: true },
  userName: { type: String, required: true, trim: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' }
}, {
  timestamps: true
});

reviewSchema.index({ toolId: 1 });

module.exports = mongoose.model('Review', reviewSchema);
