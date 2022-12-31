const Teams = require('../team/model');
const Role = require('../role/model');
const Project = require('../projects/model');
const testimoni = require('../testimoni/model');
const dashboard = async (req, res) => {
  try {
    const { name } = req.session.user;
    const teams = await Teams.find();
    const projects = await Project.find();
    const testimonials = await testimoni.find();
    res.render('index', {
      name,
      team: teams.length,
      projects: projects.length,
      testimonials: testimonials.length,
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
