const express = require("express");

const UserModel = require("../models/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken"); // To generate Token
const dotenv=require("dotenv");

dotenv.config();

const authMiddleware=require('../middleware/expenseMiddleWare');


router.post("/SIGN_UP", (req, res, next) => {
  console.log(req.body);
  const User = new UserModel({
    name: req.body.name,
    username: req.body.username,
    gmail: req.body.gmail,
    password: req.body.password, // Use plain password from request body
    userFirstSignUp: req.body.userFirstSignUp,
    category: [...req.body.category],
  });

  User.save()
    .then((result) => {
      const token = jwt.sign(
        { gmail: req.gmail },
        process.env.JWT_KEY,
        { expiresIn: '1h' } // 1 hour
      );
      res.status(200).json({
        message: "Account Created",
        status: true,
        data: {
          UserSince: result.userFirstSignUp,
          username: result.username,
          name: result.name,
          token: token,
          expiredToken: 3600,
          userId: result._id,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: 'Failed to create user',
        error: err.message,
      });
    });
});


router.post("/LOGIN", (req, res, next) => {
  UserModel.findOne({ gmail: req.body.gmail })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Invalid Email Address",
          status: false,
        });
      }

      if (req.body.password !== user.password) {
        return res.status(401).json({
          message: "Invalid Email Address or Password",
          status: false,
        });
      }

      const token = jwt.sign(
        { gmail: user.gmail, userId: user._id },
        process.env.JWT_KEY,
        { expiresIn: '1h' } // 1 hour
      );

      res.status(200).json({
        message: "Login Successfully!",
        data: {
          token: token,
          latestLoginDate: new Date(),
          userId: user._id,
          expiredToken: 3600,
        },
        status: true,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Something Went Wrong! Please Try Again",
        status: false,
      });
    });
});


router.delete("/DELETE_ACCOUNT/:id", authMiddleware, (req, res, next) => {
  UserModel.findOneAndDelete({ _id: req.params.id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "User not found",
          status: false,
        });
      }
      res.status(200).json({
        message: "Successfully deleted account",
        status: true,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "Internal Server Error",
        status: false,
      });
    });
});

router.get("/APP_VERSION", (req, res, next) => {
  res.status(200).json({
    message:'App Version successfully fetched',
    version:'v1.1.0',
    status:true,
  });
});


module.exports = router;
