require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');
const User= require("./models/user");
const BorrowedBook= require("./models/borrowedBooks");
const Book= require("./models/books");

let refreshTokens = new Set();

const app = express();
app.use(express.json());

app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });
    if (!refreshTokens.has(refreshToken)) return res.status(403).json({ message: "Forbidden" });

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) return res.status(403).json({ message: "Forbidden", error: err.message });
        const token = generateAccessToken({ user: data.user });
        res.json({ token });
    });
});

app.post('/register', async (req, res) => {
    try {
        const { name,email,role,password,borrowedBooks } = req.body;
        const salt= await bcrypt.genSalt(10);
    
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name,email,role, password: hashedPassword , borrrowedBooks });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email:email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid =  bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

        const data={user};
        const accessToken = generateAccessToken(data);
        const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.add(refreshToken);
        return res.json({accessToken :accessToken, refreshToken: refreshToken});
    }
    catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});




function generateAccessToken(userInfo) {
    return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET,);
}

app.listen(5001);