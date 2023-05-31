const User = require('./model');
const bcrypt = require('bcrypt');

const user = async (req, res) => {
  try {
    if (req.session.user === null || req.session.user === undefined) {
      res.render('admin/users/view_login');
    } else {
      res.redirect('/dashboard');
    }
  } catch (err) {
    console.log(err);
  }
};

const register = async (req, res) => {
  try {
    res.render('admin/users/view_register');
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const user = new User({
      email,
      password: bcrypt.hashSync(password, 8),
      name,
      role,
    });

    user.save((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('berhasil menambah admin');
        res.redirect('/');
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const actionLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`${email} dan ${password}`);
    if (email === 'npedigital@gmail.com') {
      if (password === 'Papua123') {
        req.session.user = {
          email,
          password,
          name: 'npeadmin',
        };
        res.redirect('/dashboard');
      }
    }
    // const admin = await User.findOne({ email });
    // console.log(req.session.users);
    // if (admin) {
    //   const checkPassword = bcrypt.compare(password, admin.password);
    //   if (checkPassword) {
    //     req.session.user = {
    //       id: admin._id,
    //       email: admin.email,
    //       password: admin.password,
    //       name: admin.name,
    //     };
    //     res.redirect('/dashboard');
    //   } else {
    //     console.log('password salah');
    //   }
    // } else {
    //   throw Error;
    // }
    // if (email) {
    //   if (password === 'npedigital') {
    //     res.redirect('/dashboard');
    //   } else {
    //     throw Error;
    //   }
    // }
  } catch (error) {
    console.log(error);
  }
};

const actionLogout = (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { user, actionLogin, registerUser, register, actionLogout };
