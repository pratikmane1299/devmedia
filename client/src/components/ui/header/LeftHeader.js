import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode } from '@fortawesome/free-solid-svg-icons';

import { useScreenWidth } from '../../../hooks/useScreenWidth';

function LeftHeader({ children }) {
  const screenWidth = useScreenWidth();

  return (
    <>
      {screenWidth === "3-cols" ? (
        <Link to="/home" style={{display: 'flex',alignItems: 'center'}}>
          <FontAwesomeIcon icon={faCode} style={{height: '30px', width: '30px'}} />
          <span style={{marginLeft: '0.5rem',fontSize: '1.2rem', fontWeight: 'bold'}}>DevMedia</span>
        </Link>
      ) : (
        <Link to="/home">
          <FontAwesomeIcon icon={faCode} style={{height: '40px', width: '40px'}} />
        </Link>
      )}
    </>
  );
}

export default LeftHeader;
