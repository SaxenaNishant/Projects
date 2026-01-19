const { getUser } = require("../services/auth");

const restirctToLoggedInUserOnly = (req, res, next) => {
    console.log("cookie", req.cookie, req.cookies)
    const userUid = req.cookies?.uuid;

    if(!userUid){
        res.redirect("/login")
    }
    const user = getUser(userUid);
    if(!user) return res.redirect("/login");

    req.user = user;
    next()
}

const checkAuth = (req, res, next) => {
    const userId = req.cookies.uuid;
    const user = getUser(userId);
    req.user = user;
    next()
}

module.exports = { restirctToLoggedInUserOnly, checkAuth }