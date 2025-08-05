const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
    walletAddress: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contribution = mongoose.model('Contribution', contributionSchema);

module.exports = Contribution;
