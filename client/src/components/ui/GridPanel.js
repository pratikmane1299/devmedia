import React from 'react';

export function GridPanel({
  children,
}) {
  return (
    <div className="grid-panel">
      {children}
    </div>
  );
}

export function FixedGridPanel({ children }) {
  return (
    <div className="fixed-panel-container">{children}</div>
  );
}
