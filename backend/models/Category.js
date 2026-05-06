const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  icon: { type: String, default: '🔧' },
  description: { type: String, default: '' },
  
  // SEO Fields
  seoTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  h1: { type: String, default: '' },
  intro: { type: String, default: '' },
  
  // Programmatic Content
  faqs: [{
    question: String,
    answer: String
  }],
  relatedCategories: [String],
  
  toolCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

categorySchema.pre('save', function(next) {
  if (this.isModified('name') || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
