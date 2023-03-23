const express = require("express");

const router = express.Router();
const user = require("../models/UserSchema");
const bcrypt = require("bcrypt");

router.post("/register", async (req, resp) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    console.log("fill all the details");
  }

  try {
    const preuser = await user.findOne({ email: email });

    if (preuser) {
      resp.status(422).json({ error: "this email is already exist" });
    } else if (password !== cpassword) {
      resp.status(422).json({ error: "password and cpassword not match" });
    } else {
      const finalUser = new user({
        name,
        email,
        password,
        cpassword,
      });

      const storeData = await finalUser.save();
      resp.status(201).json(storeData);
      console.log(storeData);
    }
  } catch (error) {
    resp.status(404).send(error);
    console.log("catch block error");
  }
});

router.post("/login", async (req, resp) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("fill all the details");
    resp.status(422).json({ error: "fill the details" });
  }

  try {
    const userValid = await user.findOne({ email: email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        resp.status(422).json({ error: "password not match" });
      } else {
        // token generate
        const token = await userValid.generateAuthtoken();
        console.log(token);
        resp.cookie("usercookie", token, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true,
        });
        const result = {
          userValid,
          token,
        };
        resp.status(201).json({ status: 201, result });
      }
    }
  } catch (error) {
    resp.status(404).json(error);
  }
});

module.exports = router;
