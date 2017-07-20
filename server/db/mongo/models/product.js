/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  seller: String,
  seller_id: String,
  name: String,
  desc: String,
  date: { type: Date, default: Date.now },
  price: Number,
  pricing_unit: String,
  active: Boolean,
  photos: [{
    filename: String
  }]
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'Product' collection in the MongoDB database
export default mongoose.model('Product', ProductSchema);

