
const Player = require('../models/player')

module.exports = {
    index,
    show,
    new: newPlayer,
    create,
    delete: deletePlayer,
    edit,
    update,
};


function index(req, res) {
    res.render('players/index',{
        players: Player.getAll(),
        title: 'skills'
    });
};

function show(req, res) {
    res.render('players/show', {
        player: Player.getOne(req.params.id),
        title: 'skills'
    })
};

function newPlayer(req, res) {
    res.render('players/new', {
        title: 'New Player'
    });
};

function create(req, res) {
    Player.create(req.body);
    res.redirect('/players');
}

function deletePlayer(req, res) {
    Player.deleteOne(req.params.id);
    res.redirect('/players')
};

function edit (req, res) {
    res.render('players/edit', {
        player: Player.getOne(req.params.id),
        title: 'Edit Skill'
    })
}

function update(req, res) {
    console.log(req.body)
    Player.updateOne(req.params.id, req.body);
    res.redirect(`/players/${req.params.id}`)
}