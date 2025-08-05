import { useState, useEffect } from 'react';

const useWallet = () => {
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        const connectWallet = async () => {
            if (window.solana) {
                try {
                    const response = await window.solana.connect();
                    setWallet(response.publicKey.toString());
                } catch (err) {
                    console.error('Wallet connection failed:', err);
                }
            } else {
                alert('Please install a Solana wallet like Phantom.');
            }
        };

        connectWallet();
    }, []);

    return wallet;
};

export default useWallet;
