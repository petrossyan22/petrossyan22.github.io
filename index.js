import express from "express";
import session from "express-session";
import path from "path";

const app = express();
app.use(express.static("public"));
app.use(session({ 
	secret: "user", 
	cookie:{
		expires: new Date(Date.now() + (30 * 86400 * 1000)),
		httpOnly: false,
	},
	saveUninitialized: true,
    resave: false,
}));

app.get("/", (req, res) => {
	req.session.user = {
		name: "Arshak"
	};
	// req.session.destroy();
	res.send("555");
	console.log(req.session);
});

app.get("/ape", (req, res) => {
	console.log(req.session);
	res.sendFile(path.resolve("./public/ape.html"));
});

app.get("/apeData", (req, res) => {
	res.send(req.session);
});

app.listen(process.env.PORT);