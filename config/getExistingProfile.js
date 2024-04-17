const PlayerProfile = require('../models/player-profile')

module.exports = async function(req, res, next) {
    if (req.user) {
        try{
            req.existingProfile = await PlayerProfile.findOne({user: req.user._id})
        } catch(err) {
            console.log(err);
            req.existingProfile = null
        }
    } 
    next()
};