import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchBox from '../../SearchBox';

function SearchHeader({ onBackButtonClick, onSearchChange }) {
  return (
    <div className="search-header-container">
      {onBackButtonClick && (
        <button className="mr" onClick={onBackButtonClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      <SearchBox mobile={true} loading={false} onChange={onSearchChange} />
    </div>
  );
}

export default SearchHeader;
