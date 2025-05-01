const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    discountedPrice: { type: Number },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Boolean, default: false },
    furnished: { type: Boolean, default: false },
    parking: { type: Boolean, default: false },
    propertyType: { type: String, enum: ["sale", "rent"], required: true },
    // images: [{ type: String }], // URLs of uploaded images
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", listingSchema);
