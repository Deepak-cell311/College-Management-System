const mongoose = require('mongoose')

const FeeSchema = new mongoose.Schema({

    courseName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sclass",
    },
    heads: {
        type: String,
        required: true
    },
    semester1: {
        type: Number,
        required: true
    },
    semester2: {
        type: Number,
        required: true
    },
    semester3: {
        type: Number,
        required: true
    },
    semester4: {
        type: Number,
        required: true
    },
    semester5: {
        type: Number,
    },
    semester6: {
        type: Number,
    },

    
})

module.exports = mongoose.model('fee', FeeSchema)