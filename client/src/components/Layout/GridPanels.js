import React from 'react';
import { connect } from 'react-redux';

import { useScreenWidth } from '../../hooks/useScreenWidth';
import { logoutAction } from '../../actions/auth';

import { GridPanel, FixedGridPanel } from '../ui/GridPanel';
import LeftHeader from '../ui/header/LeftHeader';
import RightHeader from '../ui/header/RightHeader';

export function HeaderWrapper({ children }) {
  return (
    <div className="header-wrapper" style={{ height: "3rem" }}>
      {children}
    </div>
  );
}

export function LeftPanel({ children }) {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <LeftHeader />
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  );
}

function RightPanel({
  children,
  auth: { loading, isAuthenticated, user, },
  logoutAction,
}) {
  return (
    <FixedGridPanel>
      <HeaderWrapper>
        <RightHeader
          loading={loading}
          isAuthenticated={isAuthenticated}
          user={user}
          logoutAction={logoutAction}
        />
      </HeaderWrapper>
      {children}
    </FixedGridPanel>
  );
}

function mapStateToProps(store) {
  return {
    auth: store.auth,
  };
}

export const ReduxRightPanel = connect(mapStateToProps, { logoutAction })(
  RightPanel
);

export function MiddlePanel({ children, stickyChildren }) {
  const screenWidth = useScreenWidth();
  return (
    <GridPanel>
      <div
        className={
          !(screenWidth === "fullscreen" && !stickyChildren)
            ? "sticky-header"
            : ""
        }
      >
        {screenWidth !== "fullscreen" ? (
          <HeaderWrapper>
            <div>Middle Header</div>
          </HeaderWrapper>
        ) : (
          ""
        )}
        {stickyChildren}
      </div>
      {children}
    </GridPanel>
  );
}
