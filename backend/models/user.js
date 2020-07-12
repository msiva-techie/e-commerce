const mongoose = require("mongoose");
const { uuid } = require("uuidv4");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 32
		},
		lastname: {
			type: String,
			trim: true,
			maxlength: 32
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true
		},
		encry_password: {
			type: String,
			required: true
		},
		salt: {
			type: String,
			required: true
		},
		role: {
			type: Number,
			default: 0
		},
		userInfo: {
			type: String,
			trim: true
		},
		purchases: {
			type: Array,
			default: []
		}
	},
	{
		timestamps: true
	}
);

userSchema
	.virtual("password")
	.get(function () {
		return this._password;
	})
	.set(function (password) {
		this._password = password;
		this.salt = uuid();
		this.encry_password = this.securePassword(password);
	});

userSchema.method({
	authenticate: function (plainPassword) {
		return this.securePassword(plainPassword) === this.encry_password;
	},
	securePassword: function (plainPassword) {
		try {
			if (!plainPassword) return "";
			return crypto
				.createHmac("sha256", this.salt)
				.update(plainPassword)
				.digest("hex");
		} catch (err) {
			return "";
		}
	}
});

module.exports = mongoose.model("User", userSchema);
