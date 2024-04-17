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
        
        if (playerProfile.user.equals(req.user._id)) {
            req.body.level = parseInt(req.body.level)
            playerProfile.skills.push(req.body);
            await playerProfile.save()
            // console.log('this is the PP: ', playerProfile)
        }
    } catch(err) {
        console.log(err)
    }
    res.redirect(`/player-profiles/${req.params.id}`)
}

async function deleteSkill(req, res) {
    try {
        console.log('Skill ID:', req.params.id);
        const playerProfile = await PlayerProfile.findOne({ 'skills._id': req.params.id });
        // console.log('pp: ', playerProfile)
        if (playerProfile.user.equals(req.user._id)){ 
            playerProfile.skills = playerProfile.skills.filter(skill => skill._id.toString() !== req.params.id);
            // filter iterates over each element and returns a new array containing only true elements
            //req.params.id is usually a string. seeing if skill_.id matches with the req.params.id (id is parameeter in the URL)
            await playerProfile.save();
            res.redirect(`/player-profiles/${playerProfile._id}`);
        }
    } catch (err) {
        console.error(err);
        res.redirect('/player-profiles');
    }
}

async function show(req, res) {
    console.log('query:', req.query);
    try {
        const skill = await Skill.findById(req.params.id);
        const playerProfiles = await PlayerProfile.find({ 'skills.type': req.params.id });

        if (req.query.sort === 'level') {
            playerProfiles.sort((a, b) => {
                const skillA = a.skills.find(skill => skill.type.equals(req.params.id));
                const skillB = b.skills.find(skill => skill.type.equals(req.params.id));
                return skillA.level - skillB.level;
            });
        } else if (req.query.sort === '-level') {
            playerProfiles.sort((a, b) => {
                const skillA = a.skills.find(skill => skill.type.equals(req.params.id));
                const skillB = b.skills.find(skill => skill.type.equals(req.params.id));
                return skillB.level - skillA.level;
            });
        } else if (req.query.sort === 'gamertag') {
            playerProfiles.sort((a, b) => a.gamertag.localeCompare(b.gamertag)); //if the result is negative, a comes before b; if positive, b comes before a;
        }
        res.render('skills/show', {
            title: 'Skill Details',
            playerProfiles,
            skill,
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