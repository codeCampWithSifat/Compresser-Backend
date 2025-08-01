import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();

    const payload = { user: { id: newUser._id, role: newUser.role } };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        return res.status(400).json({ message: "Regsiter User Token Error" });
      }
      res.status(201).json({
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        token,
      });
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(404).json({ message: "Email Not Found" });
    }
    const isMatchedPassword = await bcrypt.compare(
      password,
      existUser?.password
    );

    if (!isMatchedPassword) {
      return res.status(400).json({ message: "Password Not Matched" });
    }

    const payload = { user: { id: existUser._id, role: existUser.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // send the user token and response
        res.status(201).json({
          user: {
            _id: existUser._id,
            name: existUser.name,
            email: existUser.email,
            role: existUser.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const userProfile = (req, res) => {
  return res.json(req.user);
};

export { register, login, userProfile };
