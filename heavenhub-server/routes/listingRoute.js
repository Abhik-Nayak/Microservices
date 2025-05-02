const express = require('express');
const router = express.Router();
const protect = require("../middlewares/authMiddleware.js");
const {createListing,getListings,getListingById, getListingByUserId} = require('../controllers/listingController.js')


// Create a new listing
router.post("/create", protect, createListing); // Protected
router.get("/getListByUser", protect, getListingByUserId); // Protected
router.get("/get", getListings);               // Public
router.get("/get/:id", getListingById);        // Public

module.exports = router;