const Skill = require('../models/skill');
const PlayerProfile = require('../models/player-profile')

module.exports = {
    addToSkill,
    delete: deleteSkill,
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

async function deleteSkill(req, res) {
    try {
        console.log('Skill ID:', req.params.id);

        const playerProfile = await PlayerProfile.findOne({ 'skills._id': req.params.id });
        console.log('pp: ', playerProfile)

        playerProfile.skills = playerProfile.skills.filter(skill => skill._id.toString() !== req.params.id);
        await playerProfile.save();

        res.redirect('/player-profiles');
    } catch (err) {
        console.error(err);
        res.redirect('/player-profiles');
    }
}
// req.body is { skillId: '660ce95f4743d60b89fbd769', level: '10' }
// req.body.level is just the level