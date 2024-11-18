import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './UserContext';

interface NavBarProps {
    setIsLoggedIn: (value: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setIsLoggedIn }) => {
    const { user, logout } = useUser();
    const [showDropdown, setShowDropdown] = React.useState(false);

    const handleProfileClick = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="bg-blue-500 text-white px-4 py-2 flex justify-between items-center">
            {/* Updated to include a Link that directs to the main page */}
            <Link to="/" className="text-xl font-semibold hover:underline">
                Infinity Travel
            </Link>
            <div className="flex items-center">
        <span className="mr-4">
          Welcome, {user.first_name} {user.last_name}
        </span>
                <Link
                    to="/favourite-searches"
                    className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
                >
                    Favourite Searches
                </Link>

                <div className="relative">
                    <button
                        onClick={handleProfileClick}
                        className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
                    >
                        Travel Credits
                    </button>
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                            <div className="py-2 px-4 text-gray-700">
                                <strong>Coupon Code:</strong> {user.couponCode} <br />
                                <strong>Rewards Points:</strong> {user.rewards_points} {/* Display rewards points */}
                            </div>
                        </div>
                    )}
                </div>

                <Link
                    to="/profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200 mr-4"
                >
                    Profile
                </Link>
                <button
                    onClick={() => {
                        logout();
                        setIsLoggedIn(false);
                    }}
                    className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-gray-200"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
