const Project = require('../../projects/model');
const Testimoni = require('../../testimoni/model');
const Category = require('../../category/model');
const Team = require('../../team/model');
const nodemailer = require('nodemailer');
const testimoni = require('../../testimoni/model');

const landingPage = async (req, res) => {
  try {
    const projects = await Project.find()
      .select('title year urlProject description')
      .populate('category');
    const testimoni = await Testimoni.find();
    res.json({
      projects,
      testimoni,
      status: true,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

const projectPage = async (req, res) => {
  try {
    const projects = await Project.find()
      .select('title year thumbnail description urlProject')
      .populate('category');
    const category = await Category.find();
    res.json({
      projects,
      category,
      status: true,
    });
  } catch (error) {}
};

const projectDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await Project.findOne({ _id: id });
    res.json({
      project: detail,
    });
  } catch (error) {}
};

const teamsPage = async (req, res) => {
  try {
    const teams = await Team.find().populate('role');
    res.json({
      teams,
    });
  } catch (error) {}
};

const mobileService = async (req, res) => {
  try {
    const mobileCategory = await Project.find()
      .select('title year urlProject thumbnail')
      .populate('category');

    const mobile = mobileCategory.filter((mobile) => {
      return mobile.category.name
        .toLowerCase()
        .includes('Mobile'.toLowerCase());
    });

    res.json({
      mobile,
    });
  } catch (error) {
    console.log(error);
  }
};

const websiteService = async (req, res) => {
  try {
    const websiteCategory = await Project.find()
      .select('title year urlProject thumbnail')
      .populate('category');

    const website = websiteCategory.filter((website) => {
      return website.category.name
        .toLowerCase()
        .includes('Mobile'.toLowerCase());
    });

    res.json({
      website,
    });
  } catch (error) {
    console.log(error);
  }
};

const sendMessageEmail = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: 'raf.learning01@gmail.com',
      subject: `${fullname}'s order Projects`,
      text: message,
    };

    const sendingEmail = await transporter.sendMail(mailOptions);
    res.json({
      data: sendingEmail,
    });
  } catch (error) {
    console.log(error);
  }
};

const testimonials = async (req, res) => {
  try {
    const testimonials = await testimoni.find();
    console.log(testimonials);
    res.json({
      testimonials,
      status: true,
    });
  } catch (error) {}
};

// const registerAdmin = async (req, res) => {
//   try {
//     const user = await
//   } catch (error) {}
// };

module.exports = {
  landingPage,
  projectPage,
  teamsPage,
  mobileService,
  websiteService,
  projectDetail,
  sendMessageEmail,
  testimonials,
};
