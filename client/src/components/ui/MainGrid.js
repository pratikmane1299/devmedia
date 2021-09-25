import React from 'react';

import { useScreenWidth } from '../../hooks/useScreenWidth';

function MainGrid({
  children,
}) {
  const screenWidth = useScreenWidth();

  let gridTemplateColumns = '235px 640px 325px';

  if (screenWidth === '2-cols') {
    gridTemplateColumns = '60px 640px 325px';
  } else if (screenWidth === '1-cols') {
    gridTemplateColumns = '60px 640px';
  } else if (screenWidth === 'fullscreen') {
    gridTemplateColumns = '1fr';
  }

  return (
    <div className="main-grid-container">
      <div
        style={{
          position: "relative",
          display: screenWidth === "fullscreen" ? "flex" : "grid",
          gridTemplateColumns,
          columnGap: screenWidth !== 'fullscreen' ? 50 : 0,
          marginTop: screenWidth === 'fullscreen' ? '3rem':0,
          marginBottom: screenWidth === 'fullscreen' ? '3rem' : 0,
          padding: '0 1rem',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default MainGrid;
