const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const models = require("../models");
const User = models.User;

// user login
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username }
    });

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      process.env.SECRET_ACCESS_TOKEN,
      {
        algorithm: 'HS256',
        expiresIn: 86400
      }
    );    

    res.status(200).send({
      id: user.id,
      username: user.username, 
      email: user.email,
      role: user.role,
      accessToken: token
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
