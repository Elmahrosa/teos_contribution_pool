import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContributionList = () => {
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/contributions`);
                setContributions(response.data);
            } catch (error) {
                console.error('Error fetching contributions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchContributions();
    }, []);

    if (loading) return <p>Loading contributions...</p>;

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl mb-4">Recent Contributions</h2>
            <ul>
                {contributions.map((contribution, index) => (
                    <li key={index} className="border-b py-2">
                        Wallet: {contribution.walletAddress} contributed {contribution.amount} SOL
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContributionList;
