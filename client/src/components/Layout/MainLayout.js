/* eslint-disable default-case */
import React from 'react';

import { useScreenWidth } from '../../hooks/useScreenWidth';
import MainGrid from '../ui/MainGrid';
import { LeftPanel, ReduxRightPanel } from './GridPanels';


function MainLayout({
  leftPanel = <div />,
  rightPanel = <div />,
  tabletSideBar = <div />,
  children,
}) {
  const screenWidth = useScreenWidth();

  let content = null;

  switch (screenWidth) {
    case '3-cols':
      content = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <ReduxRightPanel>{rightPanel}</ReduxRightPanel>
        </>
      );
      break;
    case '2-cols':
      content = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
          <ReduxRightPanel>{rightPanel}</ReduxRightPanel>
        </>
      );
      break;
    case '1-cols':
      content = (
        <>
          <LeftPanel>{leftPanel}</LeftPanel>
          {children}
        </>
      );
      break;
    case 'fullscreen':
      content = (
        <>{children}</>
      ); 
      break;
  }

  return (
    <div style={{display:'flex', flexDirection: 'column', width: '100%'}}>
      <MainGrid>{content}</MainGrid>
    </div>
  );
}

export default MainLayout;
