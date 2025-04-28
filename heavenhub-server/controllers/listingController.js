const Listing = require("../models/ListingModel");

exports.createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      regularPrice,
      discountedPrice,
      bedrooms,
      bathrooms,
      furnished,
      parking,
      type,
      images,
    } = req.body;
    console.log(req.body);

    if (!title || !address || !price || !bedrooms || !bathrooms || !type) {
      return res.status(400).json({ status: "fail", message: "Please fill all required fields." });
    }

    const newListing = new Listing({
      userRef: req.user._id, // Logged in user's ID
      title,
      description,
      address,
      regularPrice,
      discountedPrice,
      bedrooms,
      bathrooms,
      furnished,
      parking,
      type,
      images,
    });

    await newListing.save();

    res.status(201).json({
      status: "success",
      code: 201,
      content: { data: newListing },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "fail",
      code: 500,
      message: "Server error",
    });
  }
};
