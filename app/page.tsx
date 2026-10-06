import React from 'react';

export default function Home() {
  return (
    <div className="relative w-full bg-neutral-900 text-white font-sans">
      
      {/* Background Image & Overlay (Fixed) */}
      <div 
        className="fixed inset-0 bg-cover opacity-80"
        style={{ 
          backgroundImage: "url('/custom-bg.jpg')",
          backgroundPosition: "center top"
        }}
      />
      <div className="fixed inset-0 bg-neutral-900/30 mix-blend-multiply" />
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative z-10 flex flex-col min-h-screen">
        
        {/* Giant Overlay Heading (pushed behind the text) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[-1] leading-[0.85] opacity-60">
          <h1 className="font-['Anton'] text-[16vw] tracking-tighter text-white drop-shadow-2xl translate-x-[-8%] uppercase">
            Pickleball
          </h1>
          <h1 className="font-['Anton'] text-[18vw] tracking-tighter text-white drop-shadow-2xl translate-x-[8%] uppercase text-[#f4f4f5]">
            Passion
          </h1>
        </div>

        {/* Navigation Header (Simple, flat, no glass) */}
        <nav className="flex justify-between items-center px-8 py-8 w-full max-w-[1600px] mx-auto">
          <div className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <svg className="w-6 h-6 fill-current text-[#ccff00]" viewBox="0 0 24 24"><path d="M4 12l8-8 8 8-8 8z"/></svg>
            The Loop
          </div>
          <div className="hidden md:flex gap-10">
            <a href="#home" className="hover:text-[#ccff00] text-sm font-medium transition-colors drop-shadow-md">Home</a>
            <a href="#offer" className="hover:text-[#ccff00] text-sm font-medium transition-colors drop-shadow-md">What We Offer</a>
            <a href="#contact" className="hover:text-[#ccff00] text-sm font-medium transition-colors drop-shadow-md">Contact</a>
          </div>
          <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#ccff00] transition-colors shadow-lg">
            Get started 
          </button>
        </nav>

        {/* Form moved to bottom */}
      </section>

      {/* ─── WHAT WE OFFER SECTION ─── */}
      <section id="offer" className="relative z-10 bg-neutral-900/80 backdrop-blur-2xl py-24 px-8 border-t border-white/10">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-[#ccff00] font-bold tracking-widest uppercase text-sm mb-4">What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-['Anton'] uppercase tracking-wider mb-16 text-white">Redefining the indoor club experience.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors shadow-xl">
              <div className="text-[#ccff00] text-4xl mb-6 bg-white/10 w-16 h-16 flex items-center justify-center rounded-2xl">🎾</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Pickleball</h3>
              <p className="text-neutral-300 leading-relaxed text-sm">
                Premium, well-lit, tournament-spec courts designed for both casual drop-ins and competitive leagues. Experience the fastest growing sport the right way.
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors shadow-xl">
              <div className="text-[#ccff00] text-4xl mb-6 bg-white/10 w-16 h-16 flex items-center justify-center rounded-2xl">🏏</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Cricket Nets</h3>
              <p className="text-neutral-300 leading-relaxed text-sm">
                Professional-grade indoor cricket nets allowing you to perfect your drive and bowling technique year-round, unbothered by the weather outside.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors shadow-xl">
              <div className="text-[#ccff00] text-4xl mb-6 bg-white/10 w-16 h-16 flex items-center justify-center rounded-2xl">☕</div>
              <h3 className="text-2xl font-bold mb-4 text-white">Specialty Cafe</h3>
              <p className="text-neutral-300 leading-relaxed text-sm">
                Our in-house cafe serves up crafted coffee and recovery smoothies. It's a space built to actually hang out, socialize, and recover after the game.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WAITLIST FORM SECTION ─── */}
      <section id="join" className="relative z-10 bg-neutral-900/95 backdrop-blur-3xl py-24 px-8 border-t border-white/10 flex justify-center">
        <div className="max-w-md w-full bg-white/5 p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00] opacity-10 blur-[100px] rounded-full pointer-events-none"></div>

          <h2 className="text-4xl font-bold mb-3 font-['Anton'] tracking-wider uppercase text-white relative z-10">Join The Waitlist</h2>
          <p className="text-neutral-300 mb-10 text-[15px] font-medium relative z-10">
            Secure your spot before our official launch. We'll notify you as soon as memberships open.
          </p>

          <form action="https://formsubmit.co/xgmskl@gmail.com" method="POST" className="flex flex-col gap-5 relative z-10">
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Waitlist Signup - The Loop Social Club" />
            
            <input 
              type="text" name="name" placeholder="Full Name" required 
              className="p-4 rounded-xl bg-white/90 border-none text-black focus:ring-4 focus:ring-[#ccff00]/50 outline-none font-medium transition-all" 
            />
            <input 
              type="email" name="email" placeholder="Email Address" required 
              className="p-4 rounded-xl bg-white/90 border-none text-black focus:ring-4 focus:ring-[#ccff00]/50 outline-none font-medium transition-all" 
            />
            <input 
              type="tel" name="phone" placeholder="Phone Number" required 
              className="p-4 rounded-xl bg-white/90 border-none text-black focus:ring-4 focus:ring-[#ccff00]/50 outline-none font-medium transition-all" 
            />
            <button 
              type="submit" 
              className="bg-[#ccff00] text-black font-bold p-4 rounded-xl mt-4 text-[16px] uppercase tracking-wider hover:bg-white transition-colors shadow-xl"
            >
              Secure My Spot
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
