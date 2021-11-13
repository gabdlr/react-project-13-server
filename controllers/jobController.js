const Job = require('../models/Job');
const utils = require('../utilities');
const { validationResult } = require('express-validator');

//Create new job record
exports.createJob = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }
    try {
       //Create new job
       const job = new Job(req.body);
       //Add creator id to the req (comes from the middleware)
       job.creator_id = req.user.id;
       job.save();
       res.status(200).json(job);
    } catch (error) {
        res.status(500).json({errors: error})
    }
}

//Update a course record
exports.updateJob = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }

    const jobNew = {}

    //Extract params pass it to the new object
    for(const key in req.body){
        jobNew[key] = req.body[key];
    }

    try {
        //Check for record to exist
        let job = await Job.findById(req.params.id);

        //If it doesn't exist throw error
        if(!job){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Check creator
        if (job.creator_id.toString() !== req.user.id){
            return res.status(401).json({msg: "Forbidden"});
        }

        //Update
        job = await Job.findByIdAndUpdate(
            {_id: req.params.id}, 
            { $set : jobNew}, 
            { new: true});
        res.status(200).json({msg: "Updated successfuly", registry:job});
    } catch (error) {
        res.status(500).json({msg: "Internal server error."});
    }
}

//Deletes a job register
exports.deleteJob = async (req, res) => {
    try {
        //Check for record to exist
        let job = await Job.findById(req.params.id);

        //If it doesn't exist throw error
        if(!job){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Check creator
        if (job.creator_id.toString() !== req.user.id){
            return res.status(401).json({msg: "Forbidden"});
        }
        
        //Remove entry from databse
        await Job.findOneAndDelete({_id: req.params.id});
        res.status(200).json({msg: "Job entry removed successfuly", _id: req.params.id})
    }catch(error){
        res.status(500).json({msg: "Internal server error"});
    }    
}