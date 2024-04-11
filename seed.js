require('dotenv').config();
require('./config/database');

const Skill = require('./models/skill');
const PlayerProfile = require('./models/player-profile')

const data = require('./data');

(async function() {
    const deletedSkills = await Skill.find({})
    // const result = await Skill.deleteMany({})
    // console.log(result)
    console.log('deletedSkills: ', deletedSkills)

    // const newSkills = await Skill.create(data.skills)
    // console.log(newSkills)

    const playerProfiles = await PlayerProfile.find({})
    playerProfiles.forEach(playerProfile => {
        playerProfile.skills.forEach(skill => {
            console.log(skill)
            deletedSkills.find(deletedSkill => deletedSkill.type === skill.type);
            const newSkill = Skill.find({name: deletedSkills.name})
            skill.type = newSkill._id
           

            //TODO first use the skill.type to grab the correct skill object from deletedSkills
            // then grab the new skill whose name matches the deleted skill you just grabbed and store it in a variable
            // use that new skill's id that i just grabbed to replace the old skill id in the skill.type, the first 2 steps are gonna use the same array method
        })
    })

    // try {
    //     const cursor = await PlayerProfile.aggregate([
    //         {
    //             $lookup:
    //                 {
    //                     from: 'skills',
    //                     localField: '_id',
    //                     foreignField: 'playerprofile',
    //                     as: 'matched_docs'
    //                 }
    //         },
    //         {
    //             $match: { 'matched_docs': { $eq: [] }}
    //         }
    //     ]);
    
    //     const playerprofile_ids = await cursor.map(function (doc) { return doc._id});
    //     await PlayerProfile.deleteMany({'_id': { '$in': playerprofile_ids}})

    //     console.log(results);
    // } catch (error) {
       
    //     console.error(err);
    // }

    process.exit();
})();