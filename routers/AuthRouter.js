import express  from "express";
import { getUsers,signupController,Login,Logout } from "../controllers/Users.js";
import { verifyToken } from "../Middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefereshToken.js";
import { check, validationResult} from "express-validator";



const router = express.Router();
router.get("/users", verifyToken, getUsers);
router.post("/signup",
[
    //Check Name
    check("name")
    .isLength({ min: 3 })
    .withMessage("The name must have minimum length of 3")
    .trim(),

    //Check Surname
    check("surname")
    .isLength({ min: 3 })
    .withMessage("The Surname must have minimum length of 3")
    .trim(),

    //Check Email
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid Email'),
    
   //Check password 
    check("password")
    .isLength({min: 8, max: 32})
    .withMessage("Your password should have min and max length between 8-32")
    .withMessage("Your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Your password should have at least one sepcial character"),
    
    //Check ConfirmPassword
  check("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      console.log(req.body.password, req.body.confirmPassword);
      throw new Error("Confirm password does not match");
    }
    return true;
  }),
],
(req, res, next) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);

    const hasError = !error.isEmpty();

    if (hasError) {
      res.status(422).json({ msg: error.array() });
    } else {
      next();
    }
  },
signupController
);

router.post("/login",Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;

