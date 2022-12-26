const RoleModel = require('./model');

const role = async (req, res) => {
  try {
    const { name } = req.session.user;
    res.render('admin/roles/view_roles', {
      roles: await showRole(),
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

const viewCreate = async (req, res) => {
  try {
    const { name } = req.session.user;
    res.render('admin/roles/create', {
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
    const role = await RoleModel.findOne({ _id: id });
    console.log(role.name);
    res.render('admin/roles/edit', { role, name });
  } catch (error) {
    console.log(error);
  }
};

const actionRole = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    let role = await RoleModel({ name });
    await role.save();

    res.redirect('/role');
  } catch (err) {
    console.log(err);
  }
};

const editRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let role = await RoleModel.findOneAndUpdate({ _id: id }, { name });

    res.redirect('/role');
  } catch (error) {}
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    let role = await RoleModel.findOneAndRemove({ _id: id });
    res.redirect('/role');
  } catch (error) {
    console.log(error);
  }
};

const showRole = async (req, res) => {
  try {
    const role = await RoleModel.find();
    return role;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  role,
  viewCreate,
  viewEdit,
  actionRole,
  showRole,
  editRole,
  deleteRole,
};
