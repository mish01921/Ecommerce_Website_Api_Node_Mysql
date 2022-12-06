import Users from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "name", "surname", "email"]
        });
        res.json(users)
    } catch (error) {
        console.log(error)
    }
};

export const signupController  = async (req, res) => {
    const { name, surname, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ msg: "Password or ConfirmPassword error " });
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.findAll({
        where: {
            email:email
        },
    })
if(user.length != 0 ) return res.json({ msg:"Email already registered" })
      
    try {
        await Users.create({
            name: name,
            surname: surname,
            email: email,
            password: hashedPassword
        })
        res.json({ msg: "Register successfully" })
    } catch (error) {
        res.json({ msg: "error" })
    }
    
}

export const Login = async(req,res) => {
    try {
        const user = await Users.findAll({
            where: {
                email:req.body.email
            }
        });

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Email or Password  not found!"});

        const userId = user[0].id;
        const name = user[0].name;
        const surname = user[0].surname;
        const email = user[0].email;

        const accessToken = jwt.sign({userId,surname,name,email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "20s"
        });

        const refreshToken = jwt.sign({userId,surname,name,email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: "1d"
        })
        await Users.update({refresh_token: refreshToken}, {
            where: {
                id: userId
            }
        });
      
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken })
    } catch (error) {
        res.status(404).json({msg: "Email or Password  not found! "})
    }
}

export const Logout = async(req,res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id
    await Users.update({refresh_token: null}, {
        where: {
            id: userId
        }
    })
    res.clearCookie("refreshToken");
    return res.sendStatus(200);

}