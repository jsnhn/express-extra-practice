
const PlayerProfile = require('../models/player-profile')
const Skill = require('../models/skill')

module.exports = {
    index,
    show,
    new: newPlayer,
    create,
    // delete: deletePlayer,
    // edit,
    // update,
};


async function index(req, res) {
    try {
        const playerProfiles = await PlayerProfile.find({});
       
        res.render('player-profiles/index', {
            title: 'All Players',
            playerProfiles,
            existingProfile: req.existingProfile
        });
    } catch(err) {
        console.log(err);
        res.send(err.message)
    }
}

async function show(req, res) {
    try {
        const playerProfiles = await PlayerProfile.findById(req.params.id).populate('skills.type');
        // console.log(playerProfile.skills.map(skill => skill.type._id))
        const skills = await Skill.find({ _id: { $nin: playerProfiles.skills.map(skill => skill.type._id) } }).sort('sortOrder');
        // getting just the type values
        // console.log('what is this: ', skills);
         // Initialize an empty array to hold the chart data
    

         // Iterate over each player profile to extract data for the chart
         const chartData = {
            skillNames: playerProfiles.skills.map(skill => skill.type.name),
            skillLevels: playerProfiles.skills.map(skill => skill.level)
        };
       
        res.render('player-profiles/show', {
            title: 'Player Details',
            playerProfiles,
            skills,
            chartData
        });
    } catch(err) {
        console.log(err)
        res.redirect('/player-profiles')
    }
}

function newPlayer(req, res) {
    if (req.existingProfile) {
        res.redirect('/player-profiles')
    } else {
        res.render('player-profiles/new', {
            title: 'New Player'
        });  
    }
};

async function create(req, res) {
    if (req.existingProfile) return res.redirect('/player-profiles')

    req.body.user = req.user._id
    try {
        const playerProfile = await PlayerProfile.create(req.body)
        res.redirect(`/player-profiles/${playerProfile._id}`)
    } catch(err) {
        console.log(err)
        res.render('player-profiles/new', {
            title: "Add Player",
            errorMsg: err.message
        })
    }
}



// function create(req, res) {
//     PlayerProfile.create(req.body);
//     res.redirect('/players');
// }

// function deletePlayer(req, res) {
//     PlayerProfiles.deleteOne(req.params.id);
//     res.redirect('/players')
// };

// function edit (req, res) {
//     res.render('players/edit', {
//         player: PlayerProfiles.getOne(req.params.id),
//         title: 'Edit Skill'
//     })
// }

// function update(req, res) {
//     console.log(req.body)
//     PlayerProfiles.updateOne(req.params.id, req.body);
//     res.redirect(`/players/${req.params.id}`)
// }