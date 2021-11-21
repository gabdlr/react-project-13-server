const User = require('../models/User');
const fs = require('fs');
const { UploadClient } = require('@uploadcare/upload-client');

exports.updatePicture =  async (req, res, next ) => {

    //TODO change image for picture, be consistent plz
    try {

        let user = await User.findById(req.user.id);
        const oldImagePath = user.picture;
        const newImageName = req.file.filename;
        
        const client = new UploadClient({publicKey:'67a2020bd8cead2d7e02'});
        
        client.uploadFile(`${process.env.SERVER}/assets/img/profile/${newImageName}`).then(file => 
            updatePicture(file.cdnUrl+'-/resize/250x250/')).catch( err => res.status(500).json({errors: ['Internal Server Error']}));

        // Deprecated because of ephemeral heroku's bullshit
        // //delete old image
        // //ultra uggly code improve this in the future near
        // if(!oldImagePath.includes('default.png')){
        //     if (fs.existsSync(`../public/${oldImagePath}`)) {
        //         fs.unlink(`public/${oldImagePath}`, (err) => {
        //             if (err) {
        //                 console.log(err);    
        //                 return res.status(500).json({errors: ["Internal server error"]});
        //             }
        //         });
        //     }
        //     updatePicture(newImageName);
        // } else {
        //     updatePicture(newImageName);
        // }

        //Update
        async function updatePicture(pictureRoute) {
            const userNewImage = {"picture": pictureRoute };
            user = await User.findByIdAndUpdate(
                {_id: req.user.id}, 
                { $set : userNewImage}, 
                { new: true});
            res.status(200).json({msg: "Updated successfuly", registry: pictureRoute});
            next();    
        } 
    }
        catch (error) {
            res.status(500).json({errors: ["Internal Server Error"]})
        }
}