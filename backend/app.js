require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/payment");

const PORT = process.env.PORT || 8000;

mongoose
	.connect(process.env.DB_CONN_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log("DB CONNECTED...."))
	.catch(err => {
		console.log(`ERROR IN CONNECTING DB.....${err}`);
	});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/payment", paymentRoutes);

console.log("Running in ", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "build"));
	});
}

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}.....`);
});
