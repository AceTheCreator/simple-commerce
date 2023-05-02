const {Schema, default: mongoose} = require('mongoose');

const user = new Schema({
    displayName: {
        type: String,
        require
    },
    email: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    }
})

module.exports  = mongoose.model('User', user)