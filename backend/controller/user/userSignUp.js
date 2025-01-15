const userModel = require("../../models/userModel");
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("B4c0/\/", salt);

async function userSignUpController(req, res) {
    try {

        console.log("inside signup");
        const { email, password, name, profilePic } = req.body;

        // Check if the user already exists
        const user = await userModel.findOne({ email });

        if (user) {
            throw new Error("User already exists");
        }

        if (!email) {
            throw new Error("Please provide an email");
        }
        if (!password) {
            throw new Error("Please provide a password");
        }
        if (!name) {
            throw new Error("Please provide a name");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10); // Use async version for consistency
        const hashPassword = await bcrypt.hash(password, salt); // Use async version

        // Create new user payload
        const payload = {
            ...req.body,
            role:"GENERAL",
            password: hashPassword // Save the hashed password
        };

        // Create and save the new user
        const userData = new userModel(payload);
        const savedUser = await userData.save();

        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
    } catch (err) {
        console.log('Error:', err.message);

        res.status(500).json({
            message: err.message || 'Server error',
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
