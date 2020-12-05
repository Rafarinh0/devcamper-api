const express = require('express');
const { getBootcamps, getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampInRadius, bootcampPhotoUpload } = require('../controllers/bootcamps');
const advancedResults = require('../middlewares/advancedResults');
const Bootcamp = require('../models/Bootcamp');

//Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

const { protect, authorize } = require('../middlewares/auth');

//Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/:radius/:zipcode/:distance').get(getBootcampInRadius);

router.route('/:id/photo').put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router.route('/').get(advancedResults(Bootcamp, 'courses'), getBootcamps).post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id').get(getBootcamp).put(protect, authorize('publisher', 'admin'), updateBootcamp).delete(protect, authorize('publisher', 'admin'), deleteBootcamp);


module.exports = router;