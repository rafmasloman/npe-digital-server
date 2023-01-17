const ServiceModel = require('./model');
const path = require('path');
const config = require('../../config');
const fs = require('fs');

const service = async (req, res) => {
  try {
    const { name } = req.session.user;
    const services = await showService();

    res.render('admin/services/view_service', {
      services,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

const viewCreate = async (req, res) => {
  try {
    const { name } = req.session.user;
    res.render('admin/services/create', {
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
    const service = await ServiceModel.findOne({ _id: id });

    res.render('admin/services/edit', {
      service,
      name,
    });
  } catch (error) {
    console.log(error);
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, detailDescription } = req.body;
    if (req.file) {
      // let image_path = req.files.image[0].path;
      // let thumbnail_path = req.files.thumbnail[0].path;
      // let originaExtThumbnail =
      //   req.files.thumbnail[0].originalname.split('.')[
      //     req.files.thumbnail[0].originalname.split('.').length - 1
      //   ];
      // let originaExtImage =
      //   req.files.image[0].originalname.split('.')[
      //     req.files.image[0].originalname.split('.').length - 1
      //   ];

      // let image_filename = req.files.image[0].filename + '.' + originaExtImage;
      // let thumbnail_filename =
      //   req.files.thumbnail[0].filename + '.' + originaExtThumbnail;

      // let image_target_path = path.resolve(
      //   config.rootPath,
      //   `public/uploads/services/${image_filename}`,
      // );

      // let thumbnail_target_path = path.resolve(
      //   config.rootPath,
      //   `public/uploads/services/${thumbnail_filename}`,
      // );

      // const imageSrc = fs.createReadStream(image_path);
      // const imageDest = fs.createWriteStream(image_target_path);

      // const thumbnailSrc = fs.createReadStream(thumbnail_path);
      // const thumbnailDest = fs.createWriteStream(thumbnail_target_path);

      // imageSrc.pipe(imageDest);
      // thumbnailSrc.pipe(thumbnailDest);

      // let images = {
      //   image: '',
      //   thumbnail: '',
      // };

      // imageSrc.on('end', async () => {
      //   images.image = image_filename;
      // });

      // thumbnailSrc.on('end', async () => {
      //   images.thumbnail = thumbnail_filename;
      // });

      // try {
      //   const service = new ServiceModel({
      //     name,
      //     description,
      //     detailDescription,
      //     image: images.image,
      //     thumbnail: images.thumbnail,
      //   });

      //   await service.save();

      //   req.flash('alertMessage', 'Berhasil tambah voucher');
      //   req.flash('alertStatus', 'success');

      //   res.redirect('/services');
      // } catch (error) {
      //   console.log(error);
      // }
      // req.files.map(file => {

      // })
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split('.')[
          req.file.originalname.split('.').length - 1
        ];
      let filename = req.file.filename + '.' + originaExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/uploads/services/${filename}`,
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on('end', async () => {
        try {
          const service = new ServiceModel({
            name,
            description,
            detailDescription,
            image: filename,
          });

          await service.save();

          req.flash('alertMessage', 'Berhasil tambah voucher');
          req.flash('alertStatus', 'success');

          res.redirect('/services');
        } catch (err) {
          req.flash('alertMessage', `${err.message}`);
          req.flash('alertStatus', 'danger');
          // res.redirect('/voucher')
          console.log(err);
        }
      });
    } else {
      const service = new ServiceModel({
        name,
        description,
        detailDescription,
      });
      req.flash('alertMessage', 'Berhasil tambah voucher');
      req.flash('alertStatus', 'success');
      await service.save();

      res.redirect('/services');
    }
  } catch (error) {
    console.log(error);
  }
};

const editService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, detailDescription } = req.body;

    if (req.file) {
      let tmp_path = req.file.path;
      let originaExt =
        req.file.originalname.split('.')[
          req.file.originalname.split('.').length - 1
        ];
      let filename = req.file.filename + '.' + originaExt;
      let target_path = path.resolve(
        config.rootPath,
        `public/uploads/services/${filename}`,
      );

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);

      src.on('end', async () => {
        try {
          const service = await ServiceModel.findOne({ _id: id });

          let currentImage = `${config.rootPath}/public/uploads/services/${service.image}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }

          await ServiceModel.findOneAndUpdate(
            {
              _id: id,
            },
            {
              name,
              description,
              detailDescription,
              image: filename,
            },
          );

          req.flash('alertMessage', 'Berhasil ubah voucher');
          req.flash('alertStatus', 'success');

          res.redirect('/services');
        } catch (err) {
          req.flash('alertMessage', `${err.message}`);
          req.flash('alertStatus', 'danger');
          res.redirect('/services');
        }
      });
    } else {
      await ServiceModel.findOneAndUpdate(
        {
          _id: id,
        },
        {
          name,
          description,
          detailDescription,
        },
      );

      req.flash('alertMessage', 'Berhasil ubah voucher');
      req.flash('alertStatus', 'success');

      res.redirect('/services');
    }
  } catch (err) {
    req.flash('alertMessage', `${err.message}`);
    req.flash('alertStatus', 'danger');
    console.log(err);
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await ServiceModel.findOneAndRemove({
      _id: id,
    });

    let currentImage = `${config.rootPath}/public/uploads/services/${service.image}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }

    res.redirect('/services');
  } catch (error) {
    console.log(error);
  }
};

const showService = async (req, res) => {
  try {
    const service = await ServiceModel.find();
    return service;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  service,
  viewCreate,
  createService,
  viewEdit,
  editService,
  deleteService,
};
