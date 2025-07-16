const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose =  require('mongoose');

const User = require("./models/user");

dotenv.config();

const app = express();
app.use(bodyParser.json());

const authRoutes = require('./routes/authRouter');
const userRoutes = require('./routes/userRoutes');

mongoose.connect(process.env.MONGO_URI, {
    maxPoolSize : 10,
}).then(()=>{
    console.log("MongoDB connected");
}).catch(err=>{
    console.log("Error connecting to MongoDB", err);
})

app.use('/api', authRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log("Server running at http://localhost:4500");
});
