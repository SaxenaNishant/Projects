const { User } = require("../model/user.schema")
const { setUser } = require("../services/auth");

const signUp = async(req, res) => {
    const { userName, email, password } = req.body;
    if(!email || !userName || !password){
        return res.render("signup", {
            error:"Username, email and password are required"
        })
    }

    const user = await User.findOne({$or: [{email}, {userName}]})

    if(user){
        return res.render("signup", {
            error:"User details already exist"
        })
    }

    await User.create({
        userName, email, password
    });
    return res.render("login")
}

const login = async(req, res) => {
     const { email, password } = req.body;
    if(!email || !password){
        return res.render("login", {
            error:"Email and password both are required"
        })
    }
    const user = await User.findOne({email, password});
    console.log(user)

    if(!user){
        return res.render("login", {
            error:"User details not found"
        })
    }

    const token = setUser(user);

    res.cookie("uuid", token)
    
    return res.redirect("/")
}

const logout = async(req, res) => {
    // clear cookie and return to the login page

    res.render("login")
}

module.exports = { login, logout, signUp }