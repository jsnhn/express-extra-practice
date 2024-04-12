
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
        const playerProfiles = await PlayerProfile.findById(req.params.id).populate('skills.type');
        // console.log(playerProfile.skills.map(skill => skill.type._id))
        const skills = await Skill.find({ _id: { $nin: playerProfiles.skills.map(skill => skill.type._id) } }).sort('sortOrder');
        // getting just the type values
        // console.log('what is this: ', skills);
        res.render('player-profiles/show', {
            title: 'Player Details',
            playerProfiles,
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
    req.body.user = req.user._id
    req.body.userName = req.user.name
    req.body.userAvatar = req.user.avatar
    
    console.log('log: ', req.body)
    const playerProfile = await PlayerProfile.create(req.body)

    try {
        await playerProfile.save();
    } catch(err) {
        console.log(err)
        res.render('player-profiles/new', {
            title: "Add Player",
            errorMsg: err.message
        })
    }
    res.redirect(`/player-profiles/${playerProfile._id}`)
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