require('dotenv').config();
require('./config/database');

const Skill = require('./models/skill');

const data = require('./data');

(async function() {
    let results = await Skill.deleteMany({})
    console.log(results)

    results = await Skill.create(data.skills)
    console.log(results)

    process.exit();
})();