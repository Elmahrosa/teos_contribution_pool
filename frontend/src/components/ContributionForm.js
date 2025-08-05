import React, { useState } from 'react';
import axios from 'axios';

const ContributionForm = () => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || amount <= 0) {
            setError('Please enter a valid contribution amount.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/contribute`, {
                amount,
            });
            alert(`Contribution successful: ${response.data.message}`);
            setAmount('');
        } catch (err) {
            setError('Contribution failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Make a Contribution</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (SOL)"
                className="border border-gray-300 rounded p-2 mb-4 w-full"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-secondary text-white px-4 py-2 rounded" disabled={loading}>
                {loading ? 'Processing...' : 'Contribute'}
            </button>
        </form>
    );
};

export default ContributionForm;
