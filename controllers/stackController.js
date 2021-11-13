const Stack = require('../models/Stack');
const utils = require('../utilities');
const { validationResult } = require('express-validator');

//Create new stack record
exports.createStack = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }
    try {
       //Create new stack
       const stack = new Stack(req.body);
       //Add creator id to the req (comes from the middleware)
       stack.creator_id = req.user.id;
       stack.save();
       res.status(200).json(stack);
    } catch (error) {
        res.status(500).json({errors: error})
    }
}

//Update a stack record
exports.updateStack = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }

    const stackNew = {}

    //Extract params pass it to the new object
    for(const key in req.body){
        stackNew[key] = req.body[key];
    }

    try {
        //Check for record to exist
        let stack = await Stack.findById(req.params.id);

        //If it doesn't exist throw error
        if(!stack){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Check creator
        if (stack.creator_id.toString() !== req.user.id){
            return res.status(401).json({msg: "Forbidden"});
        }

        //Update
        stack = await Stack.findByIdAndUpdate(
            {_id: req.params.id}, 
            { $set : stackNew}, 
            { new: true});
        res.status(200).json({msg: "Updated successfuly", registry:stack});
    } catch (error) {
        res.status(500).json({msg: "Internal server error."});
    }
}

//Deletes a stack register
exports.deleteStack = async (req, res) => {
    try {
        //Check for record to exist
        let stack = await Stack.findById(req.params.id);

        //If it doesn't exist throw error
        if(!stack){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Check creator
        if (stack.creator_id.toString() !== req.user.id){
            return res.status(401).json({msg: "Forbidden"});
        }
        
        //Remove entry from databse
        await Stack.findOneAndDelete({_id: req.params.id});
        res.status(200).json({msg: "Skill entry removed successfuly", _id: req.params.id})
    }catch(error){
        res.status(500).json({msg: "Internal server error"});
    }    
}