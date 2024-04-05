const Skill = require('../models/skill');
const PlayerProfile = require('../models/player-profile')

module.exports = {
    addToSkill,
    delete: deleteSkill,
    show,
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
        // console.log('Skill ID:', req.params.id);
        const playerProfile = await PlayerProfile.findOne({ 'skills._id': req.params.id });
        // console.log('pp: ', playerProfile)
        playerProfile.skills = playerProfile.skills.filter(skill => skill._id.toString() !== req.params.id);
        await playerProfile.save();
        res.redirect(`/player-profiles/${playerProfile._id}`);
    } catch (err) {
        console.error(err);
        res.redirect('/player-profiles');
    }
}

async function show(req, res) {
    try {
        const playerProfiles = await PlayerProfile.find({ 'skills.type': req.params.id }).sort({ 'skills.level': -1 });
        console.log('pp: ', playerProfiles)
        playerProfiles.forEach(profile => {
            profile.skills = profile.skills.filter(skill => skill.type.toString() === req.params.id);
        });

        res.render('skills/show', {
            title: 'Skill Details',
            playerProfiles,
        });
    } catch (err) {
        console.error(err);
        res.redirect('/player-profiles');
    }
}
// req.body is { skillId: '660ce95f4743d60b89fbd769', level: '10' }
// req.body.level is just the level



// <!-- <div class="skills-header">Skills:
//     <ul>
//         <% playerProfiles.forEach(profile => { %>
//             <% profile.skills.forEach(skill => { %>
//                 <% if (skill.type.toString() === req.params.id.toString()) { %>
//                     <li>
//                         <%= profile.gamertag %> <small><%= skill.level %></small>   
//                     </li>
//                 <% } %>
//             <% }); %>
//         <% }); %>
//     </ul>
// </div> -->