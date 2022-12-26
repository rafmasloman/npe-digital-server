const Testimoni = require('./model');

const testimoni = async (req, res) => {
  try {
    const { name } = req.session.user;
    res.render('admin/testimonials/view_testimoni', {
      name,
      testimonials: await showTestimoni(),
    });
  } catch (error) {
    console.log(error);
  }
};

const viewCreate = async (req, res) => {
  try {
    const { name } = req.session.user;
    res.render('admin/testimonials/create', {
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
    const testimoni = await Testimoni.findOne({ _id: id });

    res.render('admin/testimonials/edit', { testimoni, name });
  } catch (error) {
    console.log(error);
  }
};

const createTestimoni = async (req, res) => {
  try {
    const { clientName, clientFrom, message } = req.body;
    let testimoni = await Testimoni({ clientName, clientFrom, message });
    await testimoni.save();

    res.redirect('/testimoni');
  } catch (err) {
    console.log(err);
  }
};

const editTestimoni = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, clientFrom, message } = req.body;
    let testimoni = await Testimoni.findOneAndUpdate(
      { _id: id },
      { clientName, clientFrom, message },
    );

    res.redirect('/testimoni');
  } catch (error) {
    console.log(error);
  }
};

const deleteTestimoni = async (req, res) => {
  try {
    const { id } = req.params;
    let testimoni = await Testimoni.findOneAndRemove({ _id: id });
    res.redirect('/testimoni');
  } catch (error) {
    console.log(error);
  }
};

const showTestimoni = async (req, res) => {
  try {
    const testimoni = await Testimoni.find();
    return testimoni;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  testimoni,
  createTestimoni,
  editTestimoni,
  deleteTestimoni,
  viewCreate,
  viewEdit,
};
