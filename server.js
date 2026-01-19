const { config } = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");

const { connectDb } = require("./src/db");
const { urlRoutes } = require("./src/routes/urlShortner.routes");
const { userRoutes } = require("./src/routes/user.routes");

const path = require("path");
const { staticRoutes } = require("./src/routes/static.routes");
const { restirctToLoggedInUserOnly } = require("./src/middlewares.js/auth.middleware");

config();

connectDb().then(() => {
    const app = express();

    const PORT = process.env.PORT

    app.use(cookieParser())

    app.set("view engine", "ejs");
    app.set("views", path.resolve("./src/views"))

    app.use(express.json());
    app.use(express.urlencoded({extended: false}))

    app.use("/url", restirctToLoggedInUserOnly, urlRoutes);
    app.use("/user", userRoutes);

    app.use("/", staticRoutes)

    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    
}).catch(error => {
    console.error(`Error while connecting Mongodb ${error}`);
    process.exit(0)
})
