import React from 'react';

export default function Home() {
  return (
    <section className="relative min-h-screen w-full bg-neutral-900 overflow-hidden text-white font-sans">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/hero-bg-2.jpg')" }}
      />
      {/* Optional darkening overlay so text pops */}
      <div className="absolute inset-0 bg-neutral-900/30 mix-blend-multiply" />
      
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
            Badmi
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
            
            {/* Intro Widget */}
            <div className="max-w-xs mt-10">
              <div className="w-16 h-10 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center mb-6 cursor-pointer hover:bg-white/20 transition shadow-lg">
                <svg className="w-4 h-4 fill-current text-[#ccff00]" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
              <p className="text-neutral-200 text-sm leading-relaxed mb-4 font-medium">
                Join the fastest-growing sport with energy, skill, and community.
              </p>
              <a href="#" className="text-white text-sm font-semibold border-b-2 border-[#ccff00] pb-0.5 hover:text-[#ccff00] transition-colors">
                Join now &rarr;
              </a>
            </div>

            {/* Countdown Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl mt-12 w-full max-w-[380px]">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-semibold text-neutral-300 uppercase tracking-widest">
                  October 12th, 2026 AT 8:15 AM
                </span>
                <button className="bg-[#ccff00] text-black text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider hover:bg-white transition-colors">
                  Register now
                </button>
              </div>
              
              <div className="flex justify-between items-end px-2">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-mono tracking-tighter">12</div>
                  <div className="text-[9px] text-neutral-400 mt-2 uppercase font-semibold">Days</div>
                </div>
                <div className="text-2xl text-neutral-500 mb-5">:</div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-mono tracking-tighter">08</div>
                  <div className="text-[9px] text-neutral-400 mt-2 uppercase font-semibold">Hours</div>
                </div>
                <div className="text-2xl text-neutral-500 mb-5">:</div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-mono tracking-tighter">11</div>
                  <div className="text-[9px] text-neutral-400 mt-2 uppercase font-semibold">Minutes</div>
                </div>
                <div className="text-2xl text-neutral-500 mb-5">:</div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold font-mono tracking-tighter">09</div>
                  <div className="text-[9px] text-neutral-400 mt-2 uppercase font-semibold">Seconds</div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Spacer */}
          <div className="col-span-1 lg:col-span-4 h-full pointer-events-none"></div>

          {/* Right Column */}
          <div className="col-span-1 lg:col-span-4 flex justify-end items-start z-30 pt-10">
            {/* Event Card */}
            <div className="bg-white text-black p-3.5 rounded-[1.5rem] flex gap-4 items-center shadow-2xl w-full max-w-[320px]">
              <div className="flex-1 pl-2">
                <h4 className="font-bold text-sm leading-snug mb-3">You're Invited To Our Next Event!</h4>
                <div className="flex -space-x-2.5">
                  <img src="https://i.pravatar.cc/100?img=4" className="w-7 h-7 rounded-full border-[1.5px] border-white object-cover" alt="User" />
                  <img src="https://i.pravatar.cc/100?img=5" className="w-7 h-7 rounded-full border-[1.5px] border-white object-cover" alt="User" />
                  <img src="https://i.pravatar.cc/100?img=6" className="w-7 h-7 rounded-full border-[1.5px] border-white object-cover" alt="User" />
                </div>
              </div>
              <div className="w-[88px] h-[88px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl flex flex-col justify-end p-2.5 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(204,255,0,0.3),transparent_70%)]"></div>
                <div className="relative z-10">
                  <div className="font-bold text-lg leading-none mb-0.5">25+</div>
                  <div className="text-[8px] leading-tight opacity-80 uppercase tracking-wide">Live Tournaments</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
