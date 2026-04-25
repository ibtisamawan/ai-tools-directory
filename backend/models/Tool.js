const mongoose = require('mongoose');

const toolSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  shortDescription: { type: String, maxlength: 150 },
  fullDescription: { type: String },
  website: { type: String, required: true },
  logo: { type: String, default: '' },
  screenshots: [{ type: String }],
  category: { type: String, required: true },
  pricing: { type: String, enum: ['Free', 'Paid', 'Freemium'], default: 'Free' },
  pricingDetails: { type: String, default: '' },
  features: [{ type: String }],
  tags: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  approved: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  views: { type: Number, default: 0 }
}, {
  timestamps: true
});

// Generate slug before saving
toolSchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Text index for search
toolSchema.index({ name: 'text', shortDescription: 'text', fullDescription: 'text', tags: 'text' });
toolSchema.index({ category: 1 });
toolSchema.index({ featured: 1 });
toolSchema.index({ approved: 1 });
toolSchema.index({ rating: -1 });

module.exports = mongoose.model('Tool', toolSchema);
