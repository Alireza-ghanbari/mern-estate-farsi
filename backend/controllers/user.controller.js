import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
    const {username, password, email } = req.body
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "فقط حساب خود را اپدیت کنید"));

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email) {
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "ایمبل معتبر نمیباشد" });
    }
  }

  try {
    if (password) {
      if (password.length < 4) {
        return res.status(400).json({
          error: "گذرواژه باید بیشتر از 4 حرف داشته باشد",
        });
      } else {
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password: pw, ...userInfo } = updatedUser._doc;

    res.status(200).json(userInfo);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'فقط میتوانید حساب خود را پاک کنید'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('حساب با موفقیت پاک شد');
  } catch (error) {
    next(error);
  }
};