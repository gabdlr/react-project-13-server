const Course = require('../models/Course');
const Education = require('../models/Education');
const Job = require('../models/Job');
const Stack = require('../models/Stack');
const Tool = require('../models/Tool');
const User = require('../models/User');

const profile = {    
    "name": "",
    "lastname": "",
    "title": "",
    "email": "",
    "about": "",
    "education":[],
    "jobs":[],
    "courses":[],
    "stack":[],
    "tools":[],
    "hobbies": "", 
    "social": {
        "linkedin_url": "",
        "github_url": "",
        "twitter_url": "",
    }
}

exports.getProfile =  async (req, res) => {
    //Turn id into objectid
    try{
        //Taking into account all the stuff user brings with it i think
        //the less expensive solution is to extract and replace 🤷‍♀️
        const user = await User.findById(req.params.id);
        const education = await Education.find({ creator_id: req.params.id});
        const jobs = await Job.find({ creator_id: req.params.id});
        const courses = await Course.find({ creator_id: req.params.id});
        const stack = await Stack.find({ creator_id: req.params.id});
        const tools = await Tool.find({ creator_id: req.params.id});
        profile.name = user.name;
        profile.lastname = user.lastname;
        profile.picture =  `${process.env.SERVER}${user.picture}`;
        profile.email = user.email;
        profile.title = user.title;
        profile.about = user.about;
        profile.hobbies = user.hobbies;
        profile.social = user.social;
        profile.education = education;
        profile.jobs = jobs;
        profile.courses = courses;
        profile.stack = stack;
        profile.tools = tools;
        res.json(profile);
    }catch{
        res.status(500).json({msg: "An error has ocurred."})
    }
}