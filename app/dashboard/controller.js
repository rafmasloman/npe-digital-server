const Teams = require('../team/model');
const Role = require('../role/model');
const dashboard = async (req, res) => {
  try {
    const { name } = req.session.user;
    const teams = await Teams.find();

    res.render('index', {
      name,
      team: teams.length,
    });
  } catch (err) {
    console.log(err);
  }
};

// const loadTeams = async (req, res) => {
//   try {
//     const teams = await Teams.find();
//     return teams;
//   } catch (error) {}
// };

module.exports = { dashboard };
