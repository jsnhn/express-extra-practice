require('dotenv').config();
require('./config/database');

const PlayerProfile = require('./models/player-profile');
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


    process.exit();
})();