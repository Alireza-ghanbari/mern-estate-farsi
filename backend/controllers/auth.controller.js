import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "ایمبل معتبر نمیباشد" });
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    return res.status(400).json({
      error: "با این نام کاربری حساب ساخته شده است",
    });
  }
  
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({
      error: "با این ایمیل حساب ساخته شده است",
    });
  }


  if (password.length < 4) {
    return res.status(400).json({
      error: "گذرواژه باید بیشتر از 4 حرف داشته باشد",
    });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("حساب با موفقیت ساخته شد");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {};

export const signOut = async (req, res, next) => {};
