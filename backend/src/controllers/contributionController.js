const Contribution = require('../models/Contribution');
const User = require('../models/User');

const createContribution = async (req, res) => {
    const { walletAddress, amount } = req.body;

    try {
        // Check if user exists, if not create a new user
        let user = await User.findOne({ walletAddress });
        if (!user) {
            user = new User({ walletAddress });
            await user.save();
        }

        // Create a new contribution
        const contribution = new Contribution({ walletAddress, amount });
        await contribution.save();

        res.status(201).json({ message: 'Contribution created successfully', contribution });
    } catch (error) {
        res.status(500).json({ message: 'Error creating contribution', error });
    }
};

const getContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find();
        res.status(200).json(contributions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contributions', error });
    }
};

module.exports = { createContribution, getContributions };
