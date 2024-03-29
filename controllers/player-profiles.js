
const PlayerProfiles = require('../models/player-profile')

module.exports = {
    index,
    // show,
    // new: newPlayer,
    // create,
    // delete: deletePlayer,
    // edit,
    // update,
};


async function index(req, res) {
    try {
        const playerProfiles = await PlayerProfiles.find({});
        res.render('player-profiles/index', {
            title: 'All Players',
            playerProfiles,
        });
    } catch(err) {
        console.log(err)
        res.send(err.message)
    }
}

// function index(req, res) {
//     res.render('player-profiles/index', {
//         playerProfiles: PlayerProfiles.getAll(),
//         title: 'skills'
//     });
// };

// function show(req, res) {
//     res.render('players/show', {
//         player: PlayerProfiles.getOne(req.params.id),
//         title: 'skills'
//     })
// };

// function newPlayer(req, res) {
//     res.render('players/new', {
//         title: 'New Player'
//     });
// };

// function create(req, res) {
//     PlayerProfiles.create(req.body);
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