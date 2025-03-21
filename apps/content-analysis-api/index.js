const express = require("express"),
	cors = require("cors"),
	app = express();

// CORS configuration
const corsOptions = {
	origin: process.env.ALLOWED_ORIGINS
		? process.env.ALLOWED_ORIGINS.split(",")
		: "*",
	methods: ["GET", "POST", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	maxAge: 86400, // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.use(express.json());
require("./routes/analyze")(app);
require("./routes/research")(app);

// Failing example using the App class. App uses createMeasurementElement, which is a browser-only function.
app.get("/app", (req, res) => {
	const contentAnalysis = new App({
		callbacks: { getData: () => ({ text: "" }) },
		targets: { snippet: "this field is required" },
	});
	res.send("done");
});

const listener = app.listen(process.env.PORT, () => {
	console.log("Listening on : http://localhost:" + listener.address().port);
});
