const queryRow = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// tao token
const generateAuthToken = async function (user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};

const toHidePass = (user) => {
  delete user.password;
  return user;
};

const userController = {
  insert: async (req, res) => {
    try {
      const user = req.body;
      // check email is validator
      if (!validator.isEmail(user.email)) {
        res.status(400).send({ message: 'Định dạng mail không hợp lệ !!!' });
        return;
      }

      // check email exist
      const email = await queryRow(
        'SELECT * FROM user WHERE email = ?',
        user.email
      );
      if (email) {
        // error client
        res.status(400).send({ message: 'Email đã tồn tại !!!' });
        return;
      }

      // /* Phòng thủ tấn công BLIND SQL INJECTION */

      // /* ---------------------------------- */
      // /* encrypt password */
      // user.password = await bcrypt.hash(user.password, 8);
      // /* ---------------------------------- */

      // insert
      await queryRow('INSERT INTO user SET ?', user);

      // tao token
      const user2 = await queryRow(
        'SELECT * FROM user WHERE email = ?',
        user.email
      );
      const token = await generateAuthToken(user2);
      await queryRow('INSERT INTO token SET ?', { id_user: user2.id, token });
      // thong bao thanh cong
      res.status(201).send({ message: 'Đăng ký thành công !!!!', token });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  login: async (req, res) => {
    try {
      // /* Phòng chống tấn công BLIND SQL INJECTION */

      // // check email exist
      // const user = await queryRow(
      //   'SELECT * FROM user WHERE email = ?',
      //   req.body.email
      // );
      // if (!user) {
      //   res
      //     .status(400)
      //     .send({ message: 'Tài khoản hoặc mật khẩu không chính xác !!!' });
      //   return;
      // }
      // // check password
      // const isMatch = await bcrypt.compare(req.body.password, user.password);

      // if (!isMatch) {
      //   res
      //     .status(400)
      //     .send({ message: 'Tài khoản hoặc mật khẩu không chính xác !!!' });
      //   return;
      // }
      // // tao token
      // const user2 = await queryRow(
      //   'SELECT * FROM user WHERE email = ?',
      //   user.email
      // );
      // const token = await generateAuthToken(user2);
      // await queryRow('INSERT INTO token SET ?', { id_user: user2.id, token });
      // res.status(201).send({ message: 'Đăng nhập thành công !!!', token });

      /* BLIND SQL INJECTION */

      const email = req.body.email;
      let pass = req.body.password;
      // pass = `' OR 1=1 LIMIT 1,1;-- `;
      // const sql = `SELECT * FROM user WHERE email = '${email}' AND password = '${pass}'`;
      const sql = `SELECT * FROM user WHERE email = '${email}' AND password = '${pass}'`;
      const user2 = await queryRow(sql);
      if (!user2) {
        throw new Error('Tài khoản hoặc mật khẩu không chính xác !!!');
      }
      const token = await generateAuthToken(user2);
      await queryRow('INSERT INTO token SET ?', { id_user: user2.id, token });
      res.status(201).send({ message: 'Đăng nhập thành công !!!', token });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  logout: async (req, res) => {
    try {
      await queryRow('DELETE FROM token WHERE id_user = ? AND token = ?', [
        req.user.id,
        req.token,
      ]);
      res.status(201).send({ message: 'Logout !!!' });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  get: async (req, res) => {
    try {
      const user = await queryRow(
        'SELECT * FROM user WHERE id = ?',
        req.user.id
      );
      if (!user) {
        res.status(400).send({ message: 'Khong tim thay user !!!' });
      }
      res.status(201).send(toHidePass(user));
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  update: async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'phone', 'email', 'password'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    try {
      if (!isValidOperation) {
        throw new Error('Invalid updates!');
      }

      // if have password that encrypt password
      if ('password' in req.body) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
      }

      const sql = 'UPDATE user SET ? WHERE id = ?';
      await queryRow(sql, [req.body, req.user.id]);
      res.status(201).send({ message: 'Update Successfully!!!' });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  delete: async (req, res) => {
    try {
      const sql = 'DELETE FROM user WHERE id = ?';
      await queryRow(sql, req.user.id);
      res.status(201).send({ message: 'Delete Successfully !!!' });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },

  getDetails: async (req, res) => {
    try {
      const sql = 'SELECT * FROM user';
      const user = await queryRow(sql);

      res.status(201).send(user);
      // res
      //   .status(201)
      //   .send({ message: 'Insert successfully !!!!', token: 'tokenfake' });
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
};

module.exports = userController;
