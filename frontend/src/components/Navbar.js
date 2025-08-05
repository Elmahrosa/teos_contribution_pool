import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-primary p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-white text-2xl">TEOS Contribution Engine</h1>
                <div>
                    <Link to="/" className="text-white px-4">Home</Link>
                    <Link to="/contributions" className="text-white px-4">Contributions</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
