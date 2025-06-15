
import React from 'react';
import BillSplitter from '../components/BillSplitter';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-cover bg-center font-sans" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1920&h=1080&fit=crop')` }}>
      <BillSplitter />
      <div className="mt-4 text-white/80 text-sm font-semibold z-10 backdrop-blur-sm bg-black/20 px-3 py-1 rounded-full">
        Enjoying the app? <a href="https://coff.ee/shashikirandevadiga" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300 transition-colors font-bold">Buy me a coffee!</a>
      </div>
    </div>
  );
};

export default Index;
