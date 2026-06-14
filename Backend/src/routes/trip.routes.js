const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const tripController = require("../controllers/trip.controller")

const tripRouter = express.Router()

/**
 * @route   POST /api/trip/
 * @desc    Generate a new AI-powered trip itinerary (Expects JSON body).
 * @access  Private
 */

tripRouter.post("/", authMiddleware.authUser, tripController.generateTripController)

/**
 * @route   GET /api/trip/
 * @desc    Get all trips of logged-in user (Optimized payload without heavy AI data).
 * @access  Private
 */
tripRouter.get("/", authMiddleware.authUser, tripController.getUserTripsController)

/**
 * @route   GET /api/trip/:id
 * @desc    Get detailed itinerary of a specific trip by its ID.
 * @access  Private
 */
tripRouter.get("/:id", authMiddleware.authUser, tripController.getTripByIdController)

/**
 * @route   GET /api/trip/:id/pdf
 * @desc    Download the beautifully formatted PDF of a specific trip.
 * @access  Private
 */
tripRouter.get("/:id/pdf", authMiddleware.authUser, tripController.downloadTripPdfController)

module.exports = tripRouter