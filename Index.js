const express = require("express");
const authRoute = require("./routes/auth");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const postRoute = require("./PrivateRoute/Posts");
//Initializing express
const app = express();
app.use(cors());
app.use(express.json());

//puts/hides password when hosted
dotenv.config();

//Connecting with our db
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log("connected to database")
);

//Middlewares with authRoute as parameter
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
	res.send(
		"make use of this ultra secure backend authentication service with token for extra security in any part of your application.  DOCUMENTATION: Register User: /api/user/register, Login: /api/user/login, Private Route based on token: /api/posts"
	);
});

app.listen(process.env.PORT || 7000, () => {
	console.log(`server is running excellently well `);
});
