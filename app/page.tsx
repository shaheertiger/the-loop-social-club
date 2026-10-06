import React from 'react';

export default function Home() {
  return (
    <section className="relative min-h-screen w-full bg-neutral-900 text-white font-sans">
      
      {/* Background Image & Overlay */}
      <div 
        className="fixed inset-0 bg-cover opacity-80"
        style={{ 
          backgroundImage: "url('/custom-bg.jpg')",
          backgroundPosition: "center top" // Adjusts the focal point downward
        }}
      />
      {/* Optional darkening overlay so text pops */}
      <div className="fixed inset-0 bg-neutral-900/30 mix-blend-multiply" />
      
      {/* Giant Overlay Heading (PICKLEBALL PASSION) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 leading-[0.85]">
        <h1 className="font-['Anton'] text-[16vw] tracking-tighter text-white drop-shadow-2xl translate-x-[-8%] uppercase">
          Pickleball
        </h1>
        <h1 className="font-['Anton'] text-[18vw] tracking-tighter text-white drop-shadow-2xl translate-x-[8%] uppercase text-[#f4f4f5]">
          Passion
        </h1>
      </div>

      {/* Main Container */}
      <div className="relative z-20 flex flex-col min-h-screen p-6 lg:p-10 max-w-[1600px] mx-auto">
        
        {/* Navigation Header */}
        <nav className="flex justify-between items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] px-8 py-4 shadow-2xl">
          <div className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <svg className="w-6 h-6 fill-current text-[#ccff00]" viewBox="0 0 24 24"><path d="M4 12l8-8 8 8-8 8z"/></svg>
            The Loop
          </div>
          <div className="hidden md:flex gap-10">
            <a href="#" className="hover:text-[#ccff00] text-sm font-medium transition-colors">Home</a>
            <a href="#" className="hover:text-[#ccff00] text-sm font-medium transition-colors">About</a>
            <a href="#" className="hover:text-[#ccff00] text-sm font-medium transition-colors">Membership</a>
            <a href="#" className="hover:text-[#ccff00] text-sm font-medium transition-colors">Contact</a>
          </div>
          <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-[#ccff00] transition-colors">
            Get started 
            <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">&rarr;</span>
          </button>
        </nav>

        {/* Hero Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16 items-center">
          
          {/* Left Column */}
          <div className="col-span-1 lg:col-span-4 flex flex-col h-full justify-between z-30 pb-4">
            
            {/* Widgets Removed */}
          </div>

          {/* Center Spacer */}
          <div className="col-span-1 lg:col-span-4 h-full pointer-events-none"></div>

          {/* Right Column */}
          <div className="col-span-1 lg:col-span-4 flex justify-end items-start z-30 pt-10">
            {/* Widgets Removed */}
          </div>

        </div>
      </div>
    </section>
  );
}
