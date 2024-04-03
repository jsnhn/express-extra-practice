const Skill = require('../models/skill');
const PlayerProfile = require('../models/player-profile')

module.exports = {
    addToSkill,
}

async function addToSkill(req, res) {
    try {
        const playerProfile = await PlayerProfile.findById(req.params.id);
        const level = parseInt(req.body.level)
        playerProfile.skills.push({type: req.body.skillId, level: level});
        console.log('type: ', req.body)
        await playerProfile.save()
    } catch(err) {
        console.log(err)
    }
    res.redirect(`/player-profiles/${req.params.id}`)
}