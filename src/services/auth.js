const jwt = require("jsonwebtoken");

const secret = "Nishant@123@#$%";

const setUser = (user) => {
    return jwt.sign({_id: user._id, email:user.email}, secret)
}

const getUser = (token) => {
    if(!token) return null;
    return jwt.verify(token, secret)
}

module.exports = { getUser, setUser }