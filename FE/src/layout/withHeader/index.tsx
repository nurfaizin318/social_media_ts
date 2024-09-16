import React from 'react';
import Navbar from '../../components/ui/navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutWithHeader: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default LayoutWithHeader;