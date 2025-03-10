const mongoose = require('mongoose');
const mongodbUriString = process.env.MONGO_URI;
mongoose.connect(mongodbUriString, {
})
    .then((response) => {
        console.log("Connected to bookstore database");
    })
    .catch((err) => {
        console.error("Connection error:", err);
    });
