require('dotenv').config();
require('./config/database');

const Skill = require('./models/skill');
const PlayerProfile = require('./models/player-profile')

const data = require('./data');


(async function() {
    const deletedSkills = await Skill.find({})
    console.log('deletedSkills: ', deletedSkills)
    
    await Skill.deleteMany({})
    

    const newSkills = await Skill.create(data.skills)
    console.log('new skills', newSkills)


    const playerProfiles = await PlayerProfile.find({});

    playerProfiles.forEach(async playerProfile => {
        playerProfile.skills.forEach(playerSkill => {
            const oldSkillId = playerSkill.type
            console.log('old skill Id:', oldSkillId);
            
            const deletedSkill = deletedSkills.find(skill => skill._id.equals(oldSkillId))
            console.log('deleted skill: ', deletedSkill);
            const matchingNewSkill = newSkills.find(newSkill => newSkill.name === deletedSkill.name);
            console.log('Matching New Skill:', matchingNewSkill);

            playerSkill.type = matchingNewSkill._id
            console.log('updated player skill: ', playerSkill)
        });
        console.log('player profile: ', playerProfile)
        const result = await playerProfile.save()
        console.log('result: ', result)
    });

    // const playerProfiles = await PlayerProfile.find({});
    // newSkills.forEach(newSkill => { // Assuming newSkills is defined elsewhere
    //     const id = newSkill._id; // Accessing the _id property of each new skill
    // deletedSkills.forEach(deletedSkill => {
    //     const deletedId = deletedSkill._id
    //     playerProfiles.forEach(playerProfile => {
    //         playerProfile.skills.forEach(skill => {
    //             if (skill.type === deletedId) { // Assuming you need to compare skill types with some old value
    //                 skill.type = id; // Replacing the type with the new _id
    //             }
    //     })
    //         });
    //     });
    // });

    //TODO first use the skill.type to grab the correct skill object from deletedSkills
    // then grab the new skill whose name matches the deleted skill you just grabbed and store it in a variable
    // use that new skill's id that i just grabbed to replace the old skill id in the skill.type, the first 2 steps are gonna use the same array method

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