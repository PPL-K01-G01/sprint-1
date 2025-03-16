const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = async (req, res) => {
  console.log("Sedang register");
  const {name, email, phone_number, password, position} = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    // Cek apakah ada user dengan email yang sama
    const checkEmail = await Users.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(400).json({message: `User dengan email ${email} sudah ada!`});
    }

    await Users.create({
      name,
      email,
      phone_number,
      position,
      password: hashedPassword,
    });
    res.status(201).json({message: "Register sukses!"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        'email': req.body.email,
      }
    });

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      return res.status(400).json({message: "Kata sandi salah!"});
    }

    console.log("Kata sandi sama!")
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const phoneNumber = user[0].phone_number;
    const position = user[0].position;

    const accessToken = jwt.sign({userId, name, email, phoneNumber, position}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20s'});

    console.log("Access Token : ");
    console.log(accessToken);

    const refreshToken = jwt.sign({userId, name, email, phoneNumber, position}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

    console.log("Refresh Token : ");
    console.log(refreshToken);

    await Users.update({
      refresh_token: refreshToken,
    }, {
      where: {
        id: userId,
      }
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 86400000,
      secure: true,
    });

    // Cookie alertMessage dalam JSON
    res.cookie('alertMessage', JSON.stringify({
      message: "Login berhasil!",
      isDanger: false,
    }), {
      maxAge: 7000,
    });

    
    console.log(accessToken);
    console.log(refreshToken);

    res.json({accessToken});

  } catch (error){
    res.status(404).json({message: "Email tidak ditemukan!"});
  }

}

const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken == null) { 
    res.status(401).json({message: "Anda tidak login!"});
    
    res.cookie('alertMessage', JSON.stringify({
      message: "Anda tidak login!",
      isDanger: true
    }), {
      maxAge: 7000,
    });
    return;
  }

  const user = await Users.findOne({ where: { refresh_token: refreshToken } });
  if (user == null)  {
    res.status(403).json({message: "Refresh token tidak valid!"});
    
    res.cookie('alertMessage', JSON.stringify({
      message: "Refresh token tidak valid!",
      isDanger: true
    }), {
      maxAge: 7000,
    });
    return;
  }

  await Users.update({
    refresh_token: null,
  }, {
    where: {
      id: user.id,
    }
  });

  res.clearCookie('refreshToken');

  res.cookie('alertMessage', JSON.stringify({
    message: "Logout berhasil!",
    isDanger: false
  }), {
    maxAge: 7000,
  });

  res.clearCookie('refreshToken');

  res.json({message: "Logout berhasil!"});
  res.status(200);
}

const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const {name, email, phone_number, position} = req.body;

  try {
    const user = await Users.findByPk(id);
    if (user) {
      if (user.email != email) {
        const checkEmail = await Users.findOne({ where: { email } });
        if (checkEmail) {
          return res.status(400).json({ message: `User dengan email ${email} sudah ada!` });
        }
      }

      user.name = name;
      user.email = email;
      user.phone_number = phone_number;
      user.position = position;

      if (id == req.userId) {
        const refreshToken = req.cookies.refreshToken;
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const newRefreshToken = jwt.sign({userId: user.id, name: user.name, email: user.email, phoneNumber: user.phone_number, position: user.position}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: decoded.exp - Math.floor(Date.now() / 1000)});

        user.refresh_token = newRefreshToken;

        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          maxAge: 864000,
          secure: true,
        });
      }

      await user.save();

      console.log(`User berhasil diupdate!`);
      res.status(200).json({message: `User dengan id ${id} telah diupdate!`});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
  
}

const DeleteUser = async (req, res) => {
  if (req.position != "supervisor") {
    return res.status(401).json({message: "Anda tidak memiliki akses untuk menghapus akun!"});
  }

  const id = req.params.id;

  try {
    const user = await Users.findByPk(id);
    if (user) {
      if (user.position == "supervisor") {
        return res.status(401).json({message: "Tidak bisa menghapus akun admin!"});
      }

      await user.destroy();
      res.status(200).json({message: `User dengan id ${id} telah dihapus!`});
    } else {
      res.status(404).json({message: `User dengan id ${id} tidak ditemukan!`});
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}


module.exports = {
  Register,
  Login,
  Logout,
  UpdateUser,
  DeleteUser,
}