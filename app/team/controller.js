const TeamModel = require('./model');
const Role = require('../role/model');
const path = require('path');
const config = require('../../config');
const fs = require('fs');

const team = async (req, res) => {
  try {
    const { name } = req.session.user;
    const teams = await showTeam();

    console.log(teams);
    res.render('admin/teams/view_teams', {
      teams,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

const viewCreate = async (req, res) => {
  try {
    const { name } = req.session.user;
    const roles = await Role.find();
    res.render('admin/teams/create', {
      roles,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

const viewEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.session.user;
    const roles = await Role.find();
    const team = await TeamModel.findOne({ _id: id }).populate('role');
    // console.log(team);

    // res.render('admin/teams/view_teams', {
    //   name,
    //   teams,
    // });

    console.log(team);

    res.render('admin/teams/edit', {
      team,
      name,
      roles,
    });
  } catch (error) {
    console.log(error);
  }
};

const createTeamMember = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split('.')[
          req.file.originalname.split('.').length - 1
        ];
      let filename = req.file.filename + '.' + originaExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/uploads/teams/${filename}`,
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on('end', async () => {
        try {
          const team = new TeamModel({
            name,
            role,
            image: filename,
          });

          await team.save();

          req.flash('alertMessage', 'Berhasil tambah voucher');
          req.flash('alertStatus', 'success');

          res.redirect('/teams');
        } catch (err) {
          req.flash('alertMessage', `${err.message}`);
          req.flash('alertStatus', 'danger');
          // res.redirect('/voucher')
          console.log(err);
        }
      });
    } else {
      const team = new TeamModel({
        name,
        role,
      });
      req.flash('alertMessage', 'Berhasil tambah voucher');
      req.flash('alertStatus', 'success');
      await team.save();

      res.redirect('/teams');
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

const editTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split('.')[
          req.file.originalname.split('.').length - 1
        ];
      let filename = req.file.filename + '.' + originaExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/uploads/teams/${filename}`,
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on('end', async () => {
        try {
          const team = await TeamModel.findOne({ _id: id });

          let currentImage = `${config.rootPath}/public/uploads/${team.image}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          await TeamModel.findOneAndUpdate(
            {
              _id: id,
            },
            {
              name,
              role,
              image: filename,
            },
          );

          req.flash('alertMessage', 'Berhasil ubah voucher');
          req.flash('alertStatus', 'success');

          res.redirect('/teams');
        } catch (err) {
          req.flash('alertMessage', `${err.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/teams');
        }
      });
    } else {
      await TeamModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          name,
          role,
        },
      );

      req.flash('alertMessage', 'Berhasil ubah voucher');
      req.flash('alertStatus', 'success');

      res.redirect('/teams');
    }
  } catch (err) {
    req.flash('alertMessage', `${err.message}`);
    req.flash('alertStatus', 'danger');
    console.log(err);
  }
  // try {
  //   const { id } = req.params;
  //   const { name, role } = req.body;

  //   if (req.file) {
  //     let tmp_path = req.file.path;
  //     let originaExt =
  //       req.file.originalname.split('.')[
  //         req.file.originalname.split('.').length - 1
  //       ];
  //     let filename = req.file.filename + '.' + originaExt;
  //     let target_path = path.resolve(
  //       config.rootPath,
  //       `public/uploads/teams/${filename}`,
  //     );

  //     const src = fs.createReadStream(tmp_path);
  //     const dest = fs.createWriteStream(target_path);

  //     src.pipe(dest);

  //     src.on('end', async () => {
  //       try {
  //         const team = await TeamModel.findOne({ _id: id });
  //         let currentImage = `${config.rootPath}/public/uploads/${team.image}`;
  //         if (fs.existsSync(currentImage)) {
  //           fs.unlinkSync(currentImage);
  //         }

  //         await TeamModel.findOneAndUpdate(
  //           {
  //             _id: id,
  //           },
  //           {
  //             name,
  //             role,
  //             image: filename,
  //           },
  //         );

  //         console.log(team.image);

  //         // req.flash('alertMessage', "Berhasil ubah voucher")
  //         // req.flash('alertStatus', "success")

  //         res.redirect('/teams');
  //       } catch (err) {
  //         // req.flash('alertMessage', `${err.message}`)
  //         // req.flash('alertStatus', 'danger')
  //         console.log(err);
  //       }
  //     });
  //   } else {
  //     await TeamModel.findOneAndUpdate(
  //       {
  //         _id: id,
  //       },
  //       {
  //         name,
  //         role,
  //       },
  //     );

  //     // req.flash('alertMessage', "Berhasil ubah teams")
  //     // req.flash('alertStatus', "success")

  //     res.redirect('/teams');
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
};

const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await TeamModel.findOneAndRemove({
      _id: id,
    });

    let currentImage = `${config.rootPath}/public/uploads/${team.image}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    res.redirect('/teams');
  } catch (error) {
    console.log(error);
  }
};

const showTeam = async (req, res) => {
  try {
    const team = await TeamModel.find().populate('role');
    return team;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  team,
  viewCreate,
  createTeamMember,
  viewEdit,
  editTeamMember,
  deleteTeamMember,
};
