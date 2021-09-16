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
        <Link to="/posts">
          <FontAwesomeIcon icon={faCode} /> DevConnector
        </Link>
      ) : (
        <Link to="/posts">
          <FontAwesomeIcon icon={faCode} />
        </Link>
      )}
    </>
  );
}

export default LeftHeader;
