require('dotenv').config();
require('./config/database');

const Skill = require('./models/skill');
const PlayerProfile = require('./models/player-profile')

const data = require('./data');

(async function() {
    let results = await Skill.deleteMany({})
    console.log(results)

    results = await Skill.create(data.skills)
    console.log(results)

    try {
        const cursor = await PlayerProfile.aggregate([
            {
                $lookup:
                    {
                        from: 'skills',
                        localField: '_id',
                        foreignField: 'playerprofile',
                        as: 'matched_docs'
                    }
            },
            {
                $match: { 'matched_docs': { $eq: [] }}
            }
        ]);
    
        const playerprofile_ids = await cursor.map(function (doc) { return doc._id});
        await PlayerProfile.deleteMany({'_id': { '$in': playerprofile_ids}})

        console.log(results);
    } catch (error) {
       
        console.error(err);
    }

    process.exit();
})();