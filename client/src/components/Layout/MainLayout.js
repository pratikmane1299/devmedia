/* eslint-disable default-case */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useScreenWidth } from '../../hooks/useScreenWidth';
import MainGrid from '../ui/MainGrid';
import DefaultHeader from '../ui/mobile/header/DefaultHeader';
import { MobileNav } from '../ui/mobile/MobileNav';
import UserAvatar from '../ui/UserAvatar';
import { LeftPanel, ReduxRightPanel } from './GridPanels';


function MainLayout({
  leftPanel = <div />,
  rightPanel = <div />,
  tabletSideBar = <div />,
  children,
  currentUser,
  mobileHeader = null,
}) {
  const screenWidth = useScreenWidth();
  const history = useHistory();

  let prepend = null;
  let content = null;

  const mHeader = mobileHeader || (
    <DefaultHeader onSearchClick={() => history.push('/search')} />
  );

  const items = [
    { icon: <FontAwesomeIcon icon={faHome} />, targetPath: '/home' },
    { icon: <FontAwesomeIcon icon={faUsers} />, targetPath: '/developers' },
  ];

  if (currentUser) {
    items.push({ icon: <UserAvatar size="xs" src={currentUser.user.avatar} username="" />, targetPath: `profiles/${currentUser.user._id}` })
  }

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
      prepend = (
        <>
          {mHeader}
          <MobileNav items={items}></MobileNav>
        </>
      )
      content = (
        <>{children}</>
      ); 
      break;
  }

  return (
    <>
      <div style={{ position: "fixed", left: 0, width: "100%", zIndex: 10 }}>
        {prepend}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: 'center',
          width: "100%",
          // overflow: "hidden",
        }}
        // className={prepend ? "mb-7" : ""}
      >
        <MainGrid>{content}</MainGrid>
      </div>
    </>
  );
}

export default MainLayout;
