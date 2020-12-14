
const Bootcamp = require('../Models/Bootcamp')
const ErrorResponse = require('../utils/errorResponse')
const geocoder = require('../utils/geocoder')
const asyncHandler = require('../middleware/async')

//@desc      Get all bootcamps
//@route     GET /api/v1/bootcamps
//@access    Public
exports.getBootcamps = asyncHandler(async(req, res, next) => {
    
        const bootcamps = await Bootcamp.find()
        res.status(200).json({success: true, count: bootcamps.length ,data: bootcamps})
})


//@desc      Get single bootcamp
//@route     GET /api/v1/bootcamps/:id
//@access    Public
exports.getBootcamp = asyncHandler(async(req, res, next) => {
        const bootcamp = await Bootcamp.findById(req.params.id)
        

        if(!bootcamp){
           return  next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
        }
        
        res.status(200).json({success: true, data: bootcamp})
})


//@desc      Create a bootcamp
//@route     POST /api/v1/bootcamp
//@access    Private
exports.createBootcamp = asyncHandler(async(req, res, next) => {
        const bootcamp = await Bootcamp.create(req.body)
        res.status(201).json({success: true, data: bootcamp})
            
    
})

//@desc      Update bootcamp
//@route     PUT /api/v1/bootcamp/:id
//@access    Private
exports.updateBootcamp = asyncHandler(async(req, res, next) => {
    
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
        }
    
        res.status(200).json({success: true, data: bootcamp})
})


//@desc      Delete bootcamp
//@route     PUT /api/v1/bootcamp/:id
//@access    Private
exports.deleteBootcamp = asyncHandler(async(req, res, next) => {

        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)
        if(!bootcamp){
            return  next(new ErrorResponse(`Bootcamp not found with id ${req.params.id}`, 404))
        }
    
        res.status(200).json({success: true, data: {}})
})

//@desc      GET bootcamps within a radius
//@route     PUT /api/v1/bootcamp/radius/:zipcode/:distance
//@access    Private
exports.getBootcampsInRadius = asyncHandler(async(req, res, next) => {
        const {zipcode, distance} = req.params

        const loc = await geocoder.geocode(zipcode)
        //Get latitude/longitude
        const lat = loc[0].latitude
        const lon = loc[0].longitude

        //Calculate the readius of the earth
        //Earth rad = 3963miles/6378km

        const radius = distance/3963

        const bootcamps = await Bootcamp.find({
                location: {$geoWithin: {$centerSphere: [[lon, lat], radius]}}
        })

        res.status(200).json({
                success: true,
                count: bootcamps.length,
                data: bootcamps
        })
      
})