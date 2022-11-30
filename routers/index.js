import express  from "express";
import { getUsers,Register,Login,Logout } from "../controllers/Users.js";
import { verifyToken } from "../Middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefereshToken.js";
import { check, validationResult,body } from "express-validator";
import Users from "../model/UserModel.js";



const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users",
[
    check("name")
    .isLength({ min: 3 })
    .withMessage("the name must have minimum length of 3")
    .trim(),

    check("surname")
    .isLength({ min: 3 })
    .withMessage("the Surname must have minimum length of 3")
    .trim(),


  check("email")
    .isEmail()
    .withMessage("invalid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8, max: 32 })
    .withMessage("your password should have min and max length between 8-32")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character")
    .isLowercase()
    .not()
    .withMessage("your password should have at least one lowercase"),


  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      console.log(req.body.password, req.body.confirmPassword);
      throw new Error("confirm password does not match");
    }
    return true;
  }),
],
(req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ error: error.array() });
    } else {
      next();
    }
  },
Register
);

router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;