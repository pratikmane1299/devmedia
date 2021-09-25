import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faSearch } from '@fortawesome/free-solid-svg-icons';

function MobileHeader({ onSearchClick }) {
  return (
    <div className="mobile-header-container">
      <Link to="/home" style={{ display: "flex", alignItems: "center" }}>
        <FontAwesomeIcon
          icon={faCode}
          style={{ height: "30px", width: "30px" }}
        />
        <span
          style={{
            marginLeft: "0.5rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          DevMedia
        </span>
      </Link>
      <div className="mobile-header-action-btns-container">
        <button onClick={onSearchClick}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
}

export default MobileHeader;
