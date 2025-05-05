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
    const { search, priceMin, priceMax, type, page = 1 } = req.query;
    const limit = 5;
    const skip = (parseInt(page) - 1) * limit;

    // Base filter: user-specific listings
    const query = {
      userRef: req.user._id,
    };

    // Location-based search
    if (search) {
      query.location = { $regex: search, $options: "i" };
    }

    // Price range
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    // Type filter
    if (type) {
      query.type = type;
    }

    // Get total count (optional, for frontend metadata)
    const total = await Listing.countDocuments(query);

    // Get paginated listings
    const listings = await Listing.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (!listings || listings.length === 0) {
      return sendError(res, 404, "No listings found for this user.");
    }

    return sendResponse(res, 200, "Listings retrieved successfully", 
    {
      data: listings,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      hasMore: parseInt(page) < Math.ceil(total / limit),
    });
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
