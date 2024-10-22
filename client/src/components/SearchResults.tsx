import React from 'react';
import { useUser } from './UserContext';  // Import useUser to access the session

interface SearchResultsProps {
  results: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const { user } = useUser();  // Access the session data (like isLoggedIn)

  if (!user.isLoggedIn) {
    return <div>Please log in to see search results.</div>;  // Display a message if not logged in
  }

  return (
      <div className="search-results">
        {results.length > 0 && <h3>Search Results:</h3>}
        {results.map((result, index) => (
            <div key={index} className="result-item">{result}</div>
        ))}
      </div>
  );
};

export default SearchResults;
