import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Spinner from '../Layout/Spinner';

function SearchBox({
  loading,
  mobile,
  ...props
}) {
  return <div className="searchbox-container">
    {!mobile && (
      <div className="ml">
        <FontAwesomeIcon icon={faSearch} />
      </div>
    )}
    <input id="search" name="search" {...props} />
    {loading && (
      <div className="ml">
        <Spinner />
      </div>
    )}
  </div>;
}

export default SearchBox;
