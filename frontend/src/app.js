import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContributionForm from './components/ContributionForm';
import ContributionList from './components/ContributionList';
import './styles/tailwind.css'; // Import Tailwind CSS

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-background text-text">
                <Navbar />
                <div className="container mx-auto p-6">
                    <Switch>
                        <Route path="/" exact component={ContributionForm} />
                        <Route path="/contributions" component={ContributionList} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
