import Users from "../model/UserModel.js";
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users)
    } catch (error) {
        console.log(error)
    }
};

export const Register = async (req, res) => {
    const { name, surname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ msg: "Password or ConfirmPassword error " });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await Users.create({
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword
        })
        res.json({ msg: "Register successfully" })
    } catch (error) {
        console.log(error);
    }
}
export const Login = async (req, res) => {
    try {
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        const userId = user[0].id;
        const name = user[0].name;
        const surname = user[0].surname;
        const email = user[0].email;

        const accessToken = jwt.sign({ userId, name, surname, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s"
        });

        const refreshToken = jwt.sign({ userId, name, surname, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        })
        await Users.update({ refresh_token: refreshToken }, {
            id: userId
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
        })
        res.json({ accessToken });

    } catch (error) {
        res.staus(404).json({ msg: "Email error!" })
    }
}
