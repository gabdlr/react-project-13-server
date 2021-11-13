const Course = require('../models/Course');
const utils = require('../utilities');
const { validationResult } = require('express-validator');

//Create new Course record
exports.createCourse = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }
    try {
       //Create new course
       const course = new Course(req.body);
       //Add creator id to the req (comes from the middleware)
       course.creator_id = req.user.id;
       course.save();
       res.status(200).json(course);
    } catch (error) {
        res.status(500).json({errors: error})
    }
}

//Update a course record
exports.updateCourse = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }

    const courseNew = {}

    //Extract params pass it to the new object
    for(const key in req.body){
        courseNew[key] = req.body[key];
    }

    try {
        //Check for record to exist
        let course = await Course.findById(req.params.id);

        //If it doesn't exist throw error
        if(!course){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Check creator
        if (course.creator_id.toString() !== req.user.id){
            return res.status(401).json({msg: "Forbidden"});
        }

        //Update
        course = await Course.findByIdAndUpdate(
            {_id: req.params.id}, 
            { $set : courseNew}, 
            { new: true});
        res.status(200).json({msg: "Updated successfuly", registry:course});
    } catch (error) {
        res.status(500).json({msg: "Internal server error."});
    }
}

//Deletes a course register
exports.deleteCourse = async (req, res) => {
    try {
        //Check for record to exist
        let course = await Course.findById(req.params.id);

        //If it doesn't exist throw error
        if(!course){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Check creator
        if (course.creator_id.toString() !== req.user.id){
            return res.status(401).json({msg: "Forbidden"});
        }
        
        //Remove entry from databse
        await Course.findOneAndDelete({_id: req.params.id});
        res.status(200).json({msg: "Certificate entry removed successfuly", _id: req.params.id})
    }catch(error){
        res.status(500).json({msg: "Internal server error"});
    }    
}