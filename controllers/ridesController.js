// get all rides
// @route GET /api/rides
// @access public
const getRides = (req,  res) => {
    res.status(200).json({
        message: "Get all rides"
    })
}

// Get a rides
// @route GET /api/rides
// @access public
const getRide = (req, res)=>{
    res.status(200).json({
        message: `Get ride for ${req.params.id}`
    })
}

// Book a rides
// @route POST /api/rides
// @access public
const bookRide = (req,  res) => {
    console.log("The request body is: ", req.body)
    const {name, route} = req.body
    if(!name || !route){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    res.status(201).json({
        message: "Book a ride"
    })
}

// Update a rides
// @route PUT /api/rides
// @access public
const updateRide = (req, res)=>{
    res.status(200).json({
        message: `Update ride for ${req.params.id}`
    })
}

// Delete a rides
// @route DEL /api/rides
// @access public
const deleteRide = (req, res)=>{
    res.status(200).json({
        message: `Delete a ride for ${req.params.id}`
    })
}


module.exports = {getRides, getRide, bookRide, updateRide, deleteRide}