// src/components/SearchResults.tsx
import React from 'react';

interface SearchResultsProps {
  results: string[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
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
