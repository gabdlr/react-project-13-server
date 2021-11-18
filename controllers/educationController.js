const Education = require('../models/Education');
const utils = require('../utilities');
const { validationResult } = require('express-validator');

//Create new education record
exports.createEducation = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }
    try {
       //Create new education
       const education = new Education(req.body);
       //Add creator id to the req (comes from the middleware)
       education.creator_id = req.user.id;
       education.save();
       res.status(200).json(education);
    } catch (error) {
        res.status(500).json({errors: error})
    }
}

// //Get all education records
// exports.getEducation = async (req, res) => {
//     try{
//         const education = await Education.find({ creator_id: req.user.id });
//         res.json({education});
//     }catch{
//         res.status(500).json({msg: "An error has ocurred."})
//     }
// }

//Update a education record
exports.updateEducation = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }

    const educationNew = {}

    //Extract params pass it to the new object
    for(const key in req.body){
        educationNew[key] = req.body[key];
    }

    try {
        //Check for record to exist
        let education = await Education.findById(req.params.id);
        //If it doesn't exist throw error
        if(!education){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Check creator
        if (education.creator_id.toString() !== req.user.id){
            return res.status(401).json({msg: "Forbidden"});
        }

        //Update
        education = await Education.findByIdAndUpdate(
            {_id: req.params.id}, 
            { $set : educationNew}, 
            { new: true});
        res.status(200).json({msg: "Updated successfuly", registry:education});
    } catch (error) {
        res.status(500).json({msg: "Internal server error."});
    }
}

//Deletes a education register
exports.deleteEducation = async (req, res) => {
    try {
        //Check for record to exist
        let education = await Education.findById(req.params.id);

        //If it doesn't exist throw error
        if(!education){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Check creator
        if (education.creator_id.toString() !== req.user.id){
            return res.status(401).json({msg: "Forbidden"});
        }
        
        //Remove entry from databse
        await Education.findOneAndDelete({_id: req.params.id});
        res.status(200).json({msg: "Education entry removed successfuly", _id: req.params.id})
        }catch(error){
            res.status(500).json({msg: "Internal server error"});
        }    
}