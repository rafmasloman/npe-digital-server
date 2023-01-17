const CategoryModel = require('./model');

const category = async (req, res) => {
  try {
    const message = req.flash('alertMessage');
    const status = req.flash('alertStatus');
    const { name } = req.session.user;
    const alert = {
      message,
      status,
    };
    const categories = await getAllCategory();
    console.log(categories);
    res.render('admin/categories/view_categories', {
      categories: await getAllCategory(),

      name,
    });
  } catch (err) {
    console.log(err);
    res.redirect('/category');
  }
};

const viewCreate = async (req, res) => {
  try {
    const { name } = req.session.user;
    res.render('admin/categories/create', {
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
    const category = await CategoryModel.findOne({ _id: id });
    console.log(category.name);
    res.render('admin/categories/edit', { category, name });
  } catch (error) {
    console.log(error);
  }
};

const actionCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log(description);
    req.flash('alertMessage', 'Berhasil Menambah data');
    req.flash('alertStatus', 'success');

    let category = await CategoryModel({ name, description });

    await category.save();

    res.redirect('/category');
  } catch (err) {
    req.flash('alertMessage', 'Gagal Menambah Data');
    req.flash('alertStatus', 'danger');
    res.redirect('/category');
  }
};

const editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    req.flash('alertMessage', 'Berhasil Edit Data');
    req.flash('alertStatus', 'success');

    let category = await CategoryModel.findOneAndUpdate(
      { _id: id },
      { name, description },
    );

    res.redirect('/category');
  } catch (error) {
    req.flash('alertMessage', 'Gagal Edit Data');
    req.flash('alertStatus', 'danger');
    res.redirect('/category');
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    req.flash('alertMessage', 'Berhasil Menghapus data');
    req.flash('alertStatus', 'success');

    let category = await CategoryModel.findOneAndRemove({ _id: id });
    res.redirect('/category');
  } catch (error) {
    req.flash('alertMessage', 'Gagal menghapus data');
    req.flash('alertStatus', 'danger');
    res.redirect('/category');
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await CategoryModel.find();
    return category;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  category,
  viewCreate,
  viewEdit,
  actionCategory,
  getAllCategory,
  editCategory,
  deleteCategory,
};
