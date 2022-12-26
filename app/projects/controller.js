const Category = require('../category/model');
const Team = require('../team/model');
const Project = require('./model');
const fs = require('fs');
const path = require('path');
const config = require('../../config');

const project = async (req, res) => {
  try {
    const { name } = req.session.user;
    const projects = await Project.find().populate('category');
    console.log(projects);
    res.render('admin/projects/view_projects', {
      name,
      projects,
    });
  } catch (err) {
    console.log(err);
  }
};

const viewCreate = async (req, res) => {
  try {
    const { name } = req.session.user;
    const categories = await Category.find();
    const teams = await Team.find();
    res.render('admin/projects/create', {
      name,
      categories,
      teams,
    });
  } catch (error) {
    console.log(error);
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.session.user;
    const categories = await Category.find();
    const project = await Project.findOne({ _id: id }).populate('category');
    // console.log(project);

    // res.render('admin/projects/view_projects', {
    //   name,
    //   projects,
    // });

    console.log(project);

    res.render('admin/projects/edit', {
      project,
      name,
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

const createProject = async (req, res) => {
  try {
    const { title, year, client, description, urlProject, category } = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split('.')[
          req.file.originalname.split('.').length - 1
        ];
      let filename = req.file.filename + '.' + originaExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/uploads/projects/${filename}`,
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on('end', async () => {
        try {
          const project = new Project({
            title,
            year,
            client,
            description,
            category,
            urlProject,
            thumbnail: filename,
          });
          console.log(project);
          await project.save();

          req.flash('alertMessage', 'Berhasil tambah voucher');
          req.flash('alertStatus', 'success');

          res.redirect('/projects');
        } catch (err) {
          req.flash('alertMessage', `${err.message}`);
          req.flash('alertStatus', 'danger');
          // res.redirect('/voucher')
          console.log(err);
        }
      });
    } else {
      const project = new Project({
        title,
        year,
        client,
        description,
        category,
        urlProject,
      });
      req.flash('alertMessage', 'Berhasil tambah voucher');
      req.flash('alertStatus', 'success');
      await project.save();

      res.redirect('/projects');
    }

    // let team = await TeamModel({ name, role });
    // await team.save((err) => {
    //   if (err) console.log(err);
    //   console.log('data berhasil tersimpan');
    // });
    // res.redirect('/teams');
  } catch (error) {
    console.log(error);
  }
};

const editProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, client, description, urlProject, category } = req.body;

    if (req.file) {
      console.log(req.file);
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split('.')[
          req.file.originalname.split('.').length - 1
        ];
      let filename = req.file.filename + '.' + originaExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/uploads/projects/${filename}`,
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on('end', async () => {
        try {
          const project = await Project.findOne({ _id: id });

          let currentImage = `${config.rootPath}/public/uploads/${project.thumbnail}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          await Project.findOneAndUpdate(
            {
              _id: id,
            },
            {
              title,
              year,
              client,
              description,
              urlProject,
              category,
              thumbnail: filename,
            },
          );

          req.flash('alertMessage', 'Berhasil ubah voucher');
          req.flash('alertStatus', 'success');

          res.redirect('/projects');
        } catch (err) {
          req.flash('alertMessage', `${err.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/projects');
        }
      });
    } else {
      await Project.findOneAndUpdate(
        {
          _id: id,
        },
        {
          title,
          year,
          client,
          description,
          urlProject,
          category,
        },
      );

      req.flash('alertMessage', 'Berhasil ubah voucher');
      req.flash('alertStatus', 'success');

      res.redirect('/projects');
    }
  } catch (err) {
    req.flash('alertMessage', `${err.message}`);
    req.flash('alertStatus', 'danger');
    console.log(err);
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOneAndRemove({
      _id: id,
    });

    let currentImage = `${config.rootPath}/public/uploads/${project.thumbnail}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    res.redirect('/projects');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  project,
  viewCreate,
  viewEdit,
  createProject,
  deleteProject,
  editProject,
};
