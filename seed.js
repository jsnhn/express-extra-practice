require('dotenv').config();
require('./config/database');

const PlayerProfile = require('./models/player-profile')
const Skill = require('./models/skill');

const data = require('./data');

(async function() {
    let results = await Promise.all([
        PlayerProfile.deleteMany({}),
        Skill.deleteMany({})
    ]);

    console.log(results)

    results = await Promise.all([
        PlayerProfile.create(data.playerProfiles),
        Skill.create(data.skills)
    ])

    // results = await Promise.all([
    //     PlayerProfile.findOne({gamertag: /APEXxB1FF/}),
    //     Skill.findOne({name: /Warthog /})
    // ]);

    // const [APEXxB1FF, Warthog] = results
    // console.log('Wart: ', Warthog)
    // APEXxB1FF.skills.push({type: Warthog._id})


    // await Promise.all([
    //     APEXxB1FF.save()
    // ])

    process.exit();
})();