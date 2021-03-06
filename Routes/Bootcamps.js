const express = require('express')

const {getBootcamp, getBootcamps, deleteBootcamp, updateBootcamp, createBootcamp, getBootcampsInRadius} = require('../controllers/Bootcamps')

const router = express.Router()

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)
router.route('/').get(getBootcamps).post(createBootcamp)
router.route('/:id').get(getBootcamp).delete(deleteBootcamp).put(updateBootcamp)



module.exports = router