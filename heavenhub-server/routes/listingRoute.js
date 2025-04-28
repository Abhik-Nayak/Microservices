const express = require('express');
const router = express.Router();
const protect = require("../middlewares/authMiddleware.js");
const {createListing} = require('../controllers/listingController.js')


// Create a new listing
router.post("/create", protect, createListing);

module.exports = router;