const Skill = require('../models/skill');
const PlayerProfile = require('../models/player-profile')

module.exports = {
    addToSkill,
}

async function addToSkill(req, res) {
    try {
        const playerProfile = await PlayerProfile.findById(req.params.id);
        req.body.level = parseInt(req.body.level)
        playerProfile.skills.push(req.body);
        await playerProfile.save()
    } catch(err) {
        console.log(err)
    }
    res.redirect(`/player-profiles/${req.params.id}`)
}

// req.body is { skillId: '660ce95f4743d60b89fbd769', level: '10' }
// req.body.level is just the level