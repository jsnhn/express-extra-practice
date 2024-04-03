
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
        });
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
}

async function show(req, res) {
    try {
        const playerProfile = await PlayerProfile.findById(req.params.id).populate('skills.type');

        const skills = await Skill.find({ _id: { $nin: playerProfile.skills} }).sort('name')
        // console.log(playerProfile);
        res.render('player-profiles/show', {
            title: 'Player Details',
            playerProfile,
            skills,
        });
    } catch(err) {
        console.log(err)
        res.redirect('/player-profiles')
    }
}

function newPlayer(req, res) {
    res.render('player-profiles/new', {
        title: 'New Player'
    });
};

async function create(req, res) {
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