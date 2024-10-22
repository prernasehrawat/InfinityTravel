import React, { useState } from 'react';
import { useUser } from './UserContext';  // Import useUser to access the session

interface SearchFormProps {
    onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const { user } = useUser();  // Access the session data (like isLoggedIn)
    const [query, setQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user.isLoggedIn) {
            alert('You need to be logged in to search.');
            return;
        }

        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch} className="search-form">
            <h2>Search</h2>
            <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-field"
                disabled={!user.isLoggedIn}  // Disable input if not logged in
            />
            <button type="submit" className="button" disabled={!user.isLoggedIn}>
                Search
            </button>
        </form>
    );
};

export default SearchForm;
