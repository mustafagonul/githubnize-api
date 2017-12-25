const mongoose = require('mongoose');
const slugHero = require('mongoose-slug-hero');

slugHero.config.counter = 'githubnize_slug_counters';


const tagSchema = new mongoose.Schema(({
  login: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
}));


tagSchema.index({ login: 1, slug: 1 }, { unique: true });

tagSchema.plugin(slugHero, { doc: 'slugs', field: 'name' });


module.exports = mongoose.model('GithubnizeTag', tagSchema);
