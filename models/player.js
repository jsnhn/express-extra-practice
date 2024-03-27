const mongoose = require('mongoose');
const Schema = mongoose.Schema

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gamerTag: String,
    age: {
        type: Number,
        min: 21,
    },
    skills: {
        warthogHandling: {
            type: Number,
            min: 1,
            max: 10,
        },
        shootinAccuracy: {
            type: Number,
            min: 1,
            max: 10,
        },
        loveFactor: {
            type: Number,
            min: 1,
            max: 10,
        },
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Player', playerSchema)






















// const players = [
//     {
//         id: 123455,
//         name: 'Konrad Kaspey',
//         skills: [
//             {
//                 skill: 'Warthog handling',
//                 level: 8,
//             },
//             {
//                 skill:'Shooting accuracy',
//                 level: 9,
//             },
//             {
//                 skill: 'Team Strife',
//                 level: 2
//             },
//             {
//                 skill: 'Love Factor',
//                 level: 10
//             }
//         ],
//     }, 
//     {
//         id: 123464, 
//         name: 'OmiwanKenobi',
//         skills: [
//             {
//                 skill: 'Warthog handling',
//                 level: 5
//             },
//             {
//                 skill: 'Shooting accuracy',
//                 level: 8
//             },
//             {
//                 skill: 'Team Strife',
//                 level: 10
//             }
//         ],
//     },
//     {
//         id: 123476,
//         name: 'CobraBoy14',
//         skills: [
//             {
//                 skill: 'Warthog handling',
//                 level: 3
//             },
//             {
//                 skill: 'shooting accuracy',
//                 level: 5
//             },
//             {
//                 skill: 'Team strife',
//                 level: 2
//             }
//         ],
//     },
// ];
// module.exports = {
//     getAll,
//     getOne,
//     create,
//     deleteOne,
//     updateOne,
// };

// function getAll() {
//     return players;
// }

// function getOne(id) {
//     id = parseInt(id);
//     return players.find(player => player.id === id);
// }

// function create(player) {
//     player.id = Date.now() % 1000000;
//     player.skills = []
//     players.push(player)
// }

// function deleteOne(id) {
//     id = parseInt(id);
//     const idx = players.findIndex(player => player.id === id);
//     players.splice(idx, 1);
// }

// function updateOne(id, formData) {
//     id = parseInt(id)
//     const idx = players.findIndex(player => player.id === id);
//     players[idx].name = formData.name
//     players[idx].skill = formData.skill //TODO loop through the fromdata.skill - it is now containing an array or player skill
//     players[idx].level = formData.level
//   }