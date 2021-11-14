const User = require('../models/User');
const fs = require('fs');


exports.updatePicture =  async (req, res, next ) => {

    //TODO change image for picture, be consistent plz
    try {

        let user = await User.findById(req.user.id);
        const oldImagePath = user.picture;
        const newImageName = req.file.filename;

        //delete old image
        fs.unlink(`public/${oldImagePath}`, (err) => {
            if (err) {
                console.log(err);    
                return res.status(500).json({errors: "Internal server error"});
            }
        });

        const userNewImage = {"picture": `/assets/img/profile/${newImageName}`};

        //Update
        user = await User.findByIdAndUpdate(
            {_id: req.user.id}, 
            { $set : userNewImage}, 
            { new: true});
        res.status(200).json({msg: "Updated successfuly", registry:`${process.env.SERVER}${user.picture}`});
        next(res.status(500).json({error: "lalala"}))    
    } catch (error) {
        res.status(500).json({errors: error})
    }
}