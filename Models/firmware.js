const mongoose = require('mongoose');

const firmwareSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    Version_Name: {
        type: String,
        required: true
    },
    Version_Number: {
        type: String,
        required: true
    },
    Tool_Version: {
        type: String,
        required: true
    },
    Short_Description: {
        type: String,
        required: true
    },
    news: {
        type: String,
        required: true
    }
});

mongoose.model("Firmware", firmwareSchema);