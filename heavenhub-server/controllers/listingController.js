const Listing = require("../models/ListingModel");
const { sendError, sendResponse } = require("../utils/responseHandler");

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
      city,
      state,
      country,
      propertyType,
      images,
    } = req.body;
    console.log(req.body);

    if (
      !title ||
      !address ||
      !regularPrice ||
      !bedrooms ||
      !bathrooms ||
      !propertyType
    ) {
      return sendError(res, 400, "Please fill all required fields.");
      // return res.status(400).json({ status: "fail", message: "Please fill all required fields." });
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
      city,
      state,
      country,
      propertyType,
      // images,
    });

    await newListing.save();
    return sendResponse(res, 201, "Listing created successfully", {
      data: newListing,
    });
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Server error");
  }
};

// @desc    Get all listings by a user
// @route   GET /api/listings/user/:id
// @access  Public
exports.getListingByUserId = async (req, res) => {
  try {
    const listings = await Listing.find({ user: req.params.id });

    if (!listings || listings.length === 0) {
      return sendError(res, 404, "No listings found for this user.");
    }

    return sendResponse(res, 200, "Listings retrieved successfully", listings);
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Server error");
  }
};


// @desc    Get all listings
// @route   GET /api/listings/get
// @access  Public
exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 }); // Latest first

    return sendResponse(res, 200, "Get all listings",listings);
  } catch (error) {
    return sendError(res, 500, "Server error");
  }
};

// @desc    Get a single listing
// @route   GET /api/listings/get/:id
// @access  Public
exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return sendError(res, 404, "Listing not found.");
    }

    return sendResponse(res, 201, "Get Propertydetails by property Id",listing);
  } catch (error) {
    return sendError(res, 500, "Server error");
  }
};
