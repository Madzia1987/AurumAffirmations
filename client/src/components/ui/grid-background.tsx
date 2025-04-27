import React from 'react';

interface GridBackgroundProps {
  className?: string;
  children: React.ReactNode;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ className = '', children }) => {
  return (
    <div className={`gold-grid ${className}`}>
      {children}
    </div>
  );
};

export default GridBackground;
