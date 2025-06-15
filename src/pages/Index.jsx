
import React from 'react';
import BillSplitter from '../components/BillSplitter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center font-sans" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&h=1080&fit=crop')` }}>
      <BillSplitter />
    </div>
  );
};

export default Index;
