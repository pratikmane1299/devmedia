import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function MobileNavContainer({
    children,
}) {
  return (
    <div className="mobile-nav-container">{children}</div>
  );
}

export function MobileNavItem({ targetPath, icon = null, children }) {

  const { pathname } = useLocation();

  const isActive = pathname ? pathname.includes(targetPath) : false;

  return (
    <Link to={targetPath}>
      {children &&
        React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            className: isActive
              ? 'mobile-nav-item-icon active'
              : 'mobile-nav-item-icon',
          });
        })}
    </Link>
  );
}

export function MobileNav({
  items,
}) {
  return (
    <MobileNavContainer>
      {items.map(item => {
        return <MobileNavItem key={item.targetPath} targetPath={item.targetPath}>
          {item.icon}
        </MobileNavItem>
      })}
    </MobileNavContainer>
  );
}
