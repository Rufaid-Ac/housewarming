import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX, MapPin, Calendar, Clock, ChevronDown, Send, CheckCircle2, Circle, User, Users, MessageSquare } from 'lucide-react';
import config from '../config';
const InvitationCover = ({ config, onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleTap = () => {
    setIsOpening(true);
    // Add a slight delay for the opening animation before calling onOpen
    setTimeout(() => {
      onOpen();
    }, 1200); // Wait for card out animation
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: config.backgroundColor || '#17251C' }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)] mix-blend-overlay pointer-events-none"></div>

      {/* Botanical Background Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-[500px] md:h-[500px] bg-[url('https://cdn.pixabay.com/photo/2020/04/23/16/09/eucalyptus-5083161_1280.png')] bg-contain bg-no-repeat blur-[3px] opacity-10 pointer-events-none"
      ></motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-[500px] md:h-[500px] bg-[url('https://cdn.pixabay.com/photo/2020/04/23/16/09/eucalyptus-5083161_1280.png')] bg-contain bg-no-repeat rotate-180 blur-[3px] opacity-10 pointer-events-none"
      ></motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ 
          scale: isOpening ? 1.05 : 1, 
          opacity: isOpening ? 0 : 1,
          y: isOpening ? -20 : 0
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center justify-between p-8 md:p-12 z-10 w-[calc(100%-28px)] max-w-[520px] h-[78vh] max-h-[800px] min-h-[500px] rounded-[10px]"
        style={{ 
          backgroundColor: '#202E24',
          border: isOpening ? `1px solid ${config.lightGold || '#D4BD87'}` : `1px solid rgba(190, 157, 91, 0.55)`,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Inner Border with Arch */}
        <div className="absolute inset-3 border border-[#B89A5A]/30 rounded-[6px] rounded-t-[120px] pointer-events-none"></div>

        {/* Top Islamic Ornament */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-0 transform -translate-y-1/2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B89A5A]">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
          </svg>
        </motion.div>

        {/* Top Text Content */}
        <div className="flex flex-col items-center w-full mt-10">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-serif text-xs tracking-[4px] uppercase text-[#E8DDCA] mb-8"
          >
            You are invited
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="font-serif text-[2.8rem] md:text-6xl text-[#B89A5A] mb-6 tracking-[5px] text-center leading-none"
            style={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)', fontFamily: "'Cormorant Garamond', serif" }}
          >
            {config.houseName}
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1 }}
            className="font-sans text-xs md:text-sm tracking-[5px] uppercase text-[#F3EBDD] text-center"
          >
            {config.eventTitle || "House Warming"}
          </motion.h2>

          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex items-center justify-center space-x-3 my-10 w-full max-w-[180px]"
          >
            <div className="h-[1px] flex-1 bg-[#B89A5A]/40"></div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B89A5A]">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor"/>
            </svg>
            <div className="h-[1px] flex-1 bg-[#B89A5A]/40"></div>
          </motion.div>
        </div>

        {/* Bottom Interactive Seal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="flex flex-col items-center mt-auto mb-6"
        >
          <motion.button
            onClick={handleTap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              boxShadow: ['0 0 0 0 rgba(184, 154, 90, 0)', '0 0 20px 5px rgba(184, 154, 90, 0.3)', '0 0 0 0 rgba(184, 154, 90, 0)']
            }}
            transition={{ 
              boxShadow: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
              scale: { duration: 0.2 }
            }}
            className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full flex items-center justify-center focus:outline-none relative mb-6 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #D4BD87 0%, #B89A5A 50%, #8A733E 100%)',
              border: '2px solid #E8DDCA',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.4)'
            }}
          >
            {/* Inner Embossed Circle */}
            <div className="w-[85%] h-[85%] rounded-full border border-[#8A733E]/50 flex items-center justify-center"
                 style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(255,255,255,0.3)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#202E24] opacity-80">
                <path d="M12 2C12 2 14 8 18 10C22 12 18 14 18 14C18 14 14 16 12 22C12 22 10 16 6 14C2 12 6 10 6 10C6 10 10 8 12 2Z" fill="currentColor"/>
              </svg>
            </div>
          </motion.button>
          
          <motion.span 
            animate={{ opacity: isOpening ? 0 : 1 }}
            className="text-[#B89A5A] font-sans text-xs md:text-sm tracking-[5px] uppercase font-bold"
          >
            Tap to open
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SectionIntro = () => {
  return (
    <div className="min-h-[100svh] w-full relative overflow-hidden flex flex-col items-center justify-center text-center p-6 bg-[#18271D]">
      {/* Background Gradient & Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] opacity-80 mix-blend-overlay pointer-events-none"></div>
      
      {/* Botanical Leaves Background (Top Left & Bottom Right) */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[-5%] left-[-5%] w-64 h-64 md:w-96 md:h-96 bg-[url('https://cdn.pixabay.com/photo/2020/04/23/16/09/eucalyptus-5083161_1280.png')] bg-contain bg-no-repeat blur-[2px] pointer-events-none"
      ></motion.div>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 0.15 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-[-5%] right-[-5%] w-64 h-64 md:w-96 md:h-96 bg-[url('https://cdn.pixabay.com/photo/2020/04/23/16/09/eucalyptus-5083161_1280.png')] bg-contain bg-no-repeat rotate-180 blur-[2px] pointer-events-none"
      ></motion.div>

      {/* Thin Gold Islamic Arch */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="absolute inset-4 md:inset-8 border border-[#B59A62] pointer-events-none rounded-t-[150px] opacity-20"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-[900px] w-full mx-auto z-10 flex flex-col items-center justify-center"
      >
        {/* Arabic Calligraphy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-[#B59A62] text-3xl md:text-5xl font-serif mb-4"
          dir="rtl"
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </motion.div>

        {/* English Translation */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[#B59A62] font-serif text-sm md:text-base italic mb-6 tracking-wider uppercase"
        >
          Bismillahir Rahmanir Raheem
        </motion.p>

        {/* Decorative Ornament */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center space-x-4 mb-8 w-full max-w-[200px]"
        >
          <div className="h-[1px] flex-1 bg-[#B59A62]/30"></div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B59A62]">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor" opacity="0.8"/>
            <path d="M12 5L13.5 10.5L19 12L13.5 13.5L12 19L10.5 13.5L5 12L10.5 10.5L12 5Z" fill="currentColor"/>
          </svg>
          <div className="h-[1px] flex-1 bg-[#B59A62]/30"></div>
        </motion.div>

        {/* Main Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-[#F5EFE3] mb-8 leading-[1.2] text-[clamp(2.2rem,9vw,4rem)]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          We found a place <br/> to call our own.
        </motion.h2>

        {/* Body Text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="text-[#D9DED6] text-sm md:text-base leading-[1.7] tracking-wide font-light max-w-[420px] mx-auto mb-16"
        >
          With the grace of Almighty, we are stepping into our new home. 
          We warmly invite you to join us on this special occasion and share our joy.
        </motion.p>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-[#B59A62] mb-2"
        >
          <ChevronDown size={24} strokeWidth={1.5} />
        </motion.div>
        <p className="text-[#B59A62]/80 text-xs md:text-sm tracking-[0.3em] uppercase font-bold">Scroll to discover</p>
      </motion.div>
    </div>
  );
};

const SectionFamily = () => {
  return (
    <div className="py-24 px-4 bg-[#F3EFE5] flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[100svh]">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[560px] w-full min-h-[680px] bg-[#FAF7EF] p-8 md:p-14 flex flex-col items-center z-10"
        style={{
          border: '1px solid #C7A968',
          borderRadius: '2px',
          boxShadow: '0 25px 70px rgba(30, 40, 30, 0.14)'
        }}
      >
        {/* Botanical Decorations - Top Left */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-[-60px] left-[-60px] w-64 h-64 md:w-80 md:h-80 bg-[url('https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.png')] bg-contain bg-no-repeat opacity-60 pointer-events-none z-20"
          style={{ filter: 'sepia(40%) hue-rotate(60deg) saturate(50%) contrast(90%) brightness(1.2)' }}
        ></motion.div>
        
        {/* Botanical Decorations - Bottom Right */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-[-60px] right-[-60px] w-64 h-64 md:w-80 md:h-80 bg-[url('https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.png')] bg-contain bg-no-repeat opacity-60 pointer-events-none rotate-180 z-20"
          style={{ filter: 'sepia(40%) hue-rotate(60deg) saturate(50%) contrast(90%) brightness(1.2)' }}
        ></motion.div>

        {/* Inner Decorative Border */}
        <div className="absolute inset-[18px] md:inset-[24px] pointer-events-none z-10">
          {/* Base Border */}
          <div className="absolute inset-0 border border-[#B79A5A]/40 rounded-t-[140px]"></div>
          
          {/* Corner Ornaments */}
          <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b border-l border-[#B79A5A]/80"></div>
          <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b border-r border-[#B79A5A]/80"></div>
          <div className="absolute bottom-[-4px] left-[-4px] w-1.5 h-1.5 bg-[#B79A5A]/80 transform rotate-45"></div>
          <div className="absolute bottom-[-4px] right-[-4px] w-1.5 h-1.5 bg-[#B79A5A]/80 transform rotate-45"></div>
        </div>

        {/* Top Islamic Arch Ornament */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-2 mb-10 flex flex-col items-center z-10 relative"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B79A5A]">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
          </svg>
          <div className="w-[1px] h-6 bg-[#B79A5A]/50 mt-3"></div>
        </motion.div>

        {/* Content Container */}
        <div className="flex flex-col items-center justify-center flex-1 w-full z-10 relative">
          
          {/* Hosted By */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-[#26372C] text-[10px] md:text-xs uppercase tracking-[4px] font-sans mb-8"
          >
            Hosted By
          </motion.p>
          
          {/* Parents */}
          <div className="flex flex-col items-center space-y-5 w-full">
            {config.host.map((name, i) => (
              <React.Fragment key={i}>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 + (i * 0.2) }}
                  className="text-3xl md:text-4xl lg:text-[40px] text-[#26372C] leading-none text-center px-4 w-full"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {name}
                </motion.h3>
                {i < config.host.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.1 + (i * 0.2) }}
                    className="flex items-center justify-center space-x-3 my-4 w-full max-w-[120px]"
                  >
                    <div className="h-[1px] flex-1 bg-[#B79A5A]/60"></div>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B79A5A]">
                      <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor"/>
                    </svg>
                    <div className="h-[1px] flex-1 bg-[#B79A5A]/60"></div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* With */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-[#26372C] text-[10px] md:text-xs uppercase tracking-[4px] font-sans mt-10 mb-6"
          >
            With
          </motion.p>

          {/* Children */}
          <div className="flex flex-col items-center space-y-4 mb-8">
            {config.children.map((name, i) => (
              <motion.p 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 + (i * 0.1) }}
                className="text-2xl md:text-3xl text-[#26372C]/90 italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {name}
              </motion.p>
            ))}
          </div>

          {/* Blessings */}
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="text-[#26372C] text-[10px] md:text-xs uppercase tracking-[4px] font-sans mt-4 mb-4"
          >
            Blessings
          </motion.p>

          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 mb-8 px-4 max-w-[280px]">
            {['Aneesa', 'Aneera', 'Anees', 'Afnas'].map((name, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.1 + (i * 0.1) }}
                className="text-[17px] md:text-xl text-[#26372C]/80 italic"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {name}{i < 3 ? <span className="mr-1">,</span> : ''}
              </motion.span>
            ))}
          </div>

          {/* Invitation Message */}
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
            className="text-[#687066] text-[13px] md:text-[15px] leading-[2.2] tracking-wide max-w-[280px] my-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We would be delighted<br/>
            to have you with us<br/>
            as we begin this beautiful<br/>
            new chapter.
          </motion.p>

        </div>

        {/* Bottom Event Details */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.7 }}
          className="w-full flex flex-col items-center mt-6 space-y-3 relative z-10"
        >
          <div className="w-[80px] md:w-[120px] h-[1px] bg-[#B79A5A]/40 mb-4"></div>
          <p className="text-[#26372C] text-[13px] md:text-[15px] tracking-[3px] font-sans uppercase">
            17 September 2026
          </p>
          <p className="text-[#687066] text-[10px] md:text-xs tracking-[2px] font-sans uppercase">
            Thursday
          </p>
          <p className="text-[#687066] text-[10px] md:text-xs tracking-[2px] font-sans uppercase">
            4:00 PM Onwards
          </p>
          <p className="text-[#26372C] text-[11px] md:text-xs tracking-[2px] font-sans uppercase mt-3">
            Airport Road · Mattanur
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SectionLocation = () => {
  return (
    <div className="min-h-[100svh] py-16 px-4 md:px-6 bg-[#18271D] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] mix-blend-overlay pointer-events-none"></div>

      {/* Botanical Background Elements */}
      <motion.div 
        animate={{ y: [0, -10, 0], x: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-64 h-64 md:w-[500px] md:h-[500px] bg-[url('https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.png')] bg-contain bg-no-repeat blur-[4px] opacity-15 pointer-events-none"
        style={{ filter: 'sepia(60%) hue-rotate(80deg) saturate(30%) brightness(0.6)' }}
      ></motion.div>
      <motion.div 
        animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-64 h-64 md:w-[500px] md:h-[500px] bg-[url('https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.png')] bg-contain bg-no-repeat rotate-180 blur-[4px] opacity-15 pointer-events-none"
        style={{ filter: 'sepia(60%) hue-rotate(80deg) saturate(30%) brightness(0.6)' }}
      ></motion.div>

      {/* Main Frame */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[900px] w-full p-8 md:p-14 z-10 flex flex-col items-center border border-[#C8A967]/50 rounded-[12px] min-h-[750px]"
      >
        {/* Inner Border with Arch */}
        <div className="absolute inset-2 md:inset-3 border border-[#C8A967]/30 rounded-[8px] rounded-t-[100px] pointer-events-none"></div>
        
        {/* Corner Ornaments for the Outer Frame */}
        <div className="absolute top-[-4px] left-[-4px] w-2 h-2 bg-[#C8A967] transform rotate-45"></div>
        <div className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-[#C8A967] transform rotate-45"></div>
        <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 bg-[#C8A967] transform rotate-45"></div>
        <div className="absolute bottom-[-4px] right-[-4px] w-2 h-2 bg-[#C8A967] transform rotate-45"></div>

        {/* Top Islamic Ornament */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-0 transform -translate-y-1/2 flex flex-col items-center bg-[#18271D] px-2"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C8A967]">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
          </svg>
        </motion.div>

        {/* Header */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-3xl md:text-5xl text-[#C8A967] mt-8 mb-4 text-center leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          When & Where
        </motion.h2>

        {/* Divider */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center space-x-3 w-full max-w-[200px] mb-12"
        >
          <div className="h-[1px] flex-1 bg-[#C8A967]/40"></div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C8A967]">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor"/>
          </svg>
          <div className="h-[1px] flex-1 bg-[#C8A967]/40"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-12 md:gap-24 w-full mb-12">
          
          {/* Date Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-full border border-[#C8A967] flex items-center justify-center relative bg-[#18271D]">
              <div className="absolute inset-1 border border-[#C8A967]/30 rounded-full"></div>
              <Calendar className="text-[#C8A967]" size={20} strokeWidth={1.5} />
            </div>
            
            <h3 
              className="text-[#F3EBDD] text-[clamp(1.5rem,5vw,2.2rem)] leading-none mt-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              17 SEPTEMBER 2026
            </h3>
            
            <p className="text-[#BFC2B8] text-[0.8rem] tracking-[4px] uppercase font-sans">
              Thursday
            </p>

            <div className="w-12 h-[1px] bg-[#C8A967]/40 mt-2"></div>
          </motion.div>
          
          {/* Reception Section */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-14 h-14 rounded-full border border-[#C8A967] flex items-center justify-center relative bg-[#18271D]">
              <div className="absolute inset-1 border border-[#C8A967]/30 rounded-full"></div>
              <Clock className="text-[#C8A967]" size={20} strokeWidth={1.5} />
            </div>
            
            <h3 
              className="text-[#F3EBDD] text-[clamp(1.5rem,5vw,2.2rem)] leading-none mt-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              RECEPTION
            </h3>
            
            <p className="text-[#BFC2B8] text-[0.8rem] tracking-[4px] uppercase font-sans">
              4:00 PM ONWARDS
            </p>

            <div className="w-12 h-[1px] bg-[#C8A967]/40 mt-2"></div>
          </motion.div>
        </div>

        {/* Location Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="w-full max-w-[600px] bg-[#142219] border border-[rgba(194,163,95,0.55)] rounded-lg p-8 md:p-12 flex flex-col items-center relative"
        >
          {/* Inner border for panel */}
          <div className="absolute inset-2 border border-[#C8A967]/20 rounded-md pointer-events-none"></div>
          
          <div className="absolute top-0 transform -translate-y-1/2 bg-[#142219] px-4">
            <div className="w-12 h-12 rounded-full border border-[#C8A967] flex items-center justify-center relative">
              <div className="absolute inset-1 border border-[#C8A967]/30 rounded-full"></div>
              <MapPin className="text-[#C8A967]" size={18} strokeWidth={1.5} />
            </div>
          </div>

          <h4 
            className="text-3xl md:text-4xl text-[#F3EBDD] mt-6 mb-6 text-center leading-none tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            AALAM
          </h4>

          <div className="text-center space-y-2 mb-8">
            <p className="text-[#BFC2B8] text-xs md:text-sm tracking-[4px] uppercase font-sans">
              AIRPORT ROAD
            </p>
            <p className="text-[#BFC2B8] text-xs md:text-sm tracking-[4px] uppercase font-sans">
              MATTANUR
            </p>
          </div>

          {/* Small Divider */}
          <div className="flex items-center justify-center space-x-2 mb-10 w-full max-w-[120px]">
            <div className="h-[1px] flex-1 bg-[#C8A967]/30"></div>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C8A967]">
              <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor"/>
            </svg>
            <div className="h-[1px] flex-1 bg-[#C8A967]/30"></div>
          </div>

          {/* Map Button */}
          <motion.a 
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(200, 169, 103, 0.1)', boxShadow: '0 0 20px rgba(200, 169, 103, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            href="https://maps.app.goo.gl/TYbGDYkCvxtFZQ776?g_st=iw"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[260px] md:max-w-[250px] h-[52px] rounded-full border border-[#C8A967] flex items-center justify-center space-x-3 text-[#F3EBDD] hover:text-[#C8A967] transition-all duration-300 relative group overflow-hidden"
          >
            <MapPin size={16} className="text-[#C8A967]" />
            <span className="text-xs md:text-sm tracking-[3px] font-sans uppercase z-10 font-medium">Open in Maps</span>
            <span className="text-[#C8A967] z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>
        </motion.div>
        
        {/* Bottom Islamic Ornament */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-0 transform translate-y-1/2 flex flex-col items-center bg-[#18271D] px-2"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#C8A967]">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

const SectionRSVP = () => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: true,
    guestCount: 1,
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
      setStatus('error');
      return;
    }
    
    setStatus('submitting');
    
    const attendanceText = formData.attendance ? 'Joyfully Accept' : 'Regretfully Decline';
    let text = `Hello, here is my RSVP for the AALAM Housewarming:\n\n*Name:* ${formData.name}\n*Attending:* ${attendanceText}`;
    
    if (formData.attendance) {
      text += `\n*Total Guests:* ${formData.guestCount}`;
    }
    
    if (formData.message.trim()) {
      text += `\n*Message:* ${formData.message}`;
    }

    // Use +91 for India country code
    const whatsappUrl = `https://wa.me/919447000061?text=${encodeURIComponent(text)}`;
    
    window.open(whatsappUrl, '_blank');
    setStatus('success');
  };

  return (
    <div className="py-24 px-4 md:px-6 bg-[#F3EFE5] flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[100svh]">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none"></div>

      {/* Botanical Decorations - Top Left */}
      <motion.div 
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-[-40px] left-[-40px] w-64 h-64 md:w-[400px] md:h-[400px] bg-[url('https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.png')] bg-contain bg-no-repeat opacity-40 pointer-events-none z-0"
        style={{ filter: 'sepia(40%) hue-rotate(60deg) saturate(50%) contrast(90%) brightness(1.2)' }}
      ></motion.div>
      
      {/* Botanical Decorations - Bottom Right */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="absolute bottom-[-40px] right-[-40px] w-64 h-64 md:w-[400px] md:h-[400px] bg-[url('https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.png')] bg-contain bg-no-repeat opacity-40 pointer-events-none rotate-180 z-0"
        style={{ filter: 'sepia(40%) hue-rotate(60deg) saturate(50%) contrast(90%) brightness(1.2)' }}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-[900px] w-full bg-[#FAF7EF] p-8 md:p-16 flex flex-col items-center z-10 min-h-[600px]"
        style={{
          border: '1px solid #C7A968',
          borderRadius: '2px',
          boxShadow: '0 25px 70px rgba(30, 40, 30, 0.14)'
        }}
      >
        {/* Inner Decorative Border */}
        <div className="absolute inset-[18px] md:inset-[24px] pointer-events-none z-10">
          <div className="absolute inset-0 border border-[#B79A5A]/40 rounded-t-[140px]"></div>
          
          <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b border-l border-[#B79A5A]/80"></div>
          <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b border-r border-[#B79A5A]/80"></div>
          <div className="absolute bottom-[-4px] left-[-4px] w-1.5 h-1.5 bg-[#B79A5A]/80 transform rotate-45"></div>
          <div className="absolute bottom-[-4px] right-[-4px] w-1.5 h-1.5 bg-[#B79A5A]/80 transform rotate-45"></div>
        </div>

        {/* Top Islamic Arch Ornament */}
        <div className="mt-2 mb-8 flex flex-col items-center z-10 relative">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B79A5A]">
            <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Header */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-5xl text-[#26372C] mb-4 text-center z-10"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          RSVP
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-[#687168] text-sm md:text-base italic mb-8 z-10 text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Please respond to let us know if you can make it.
        </motion.p>

        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center space-x-3 w-full max-w-[200px] mb-12 z-10"
        >
          <div className="h-[1px] flex-1 bg-[#B79A5A]/60"></div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B79A5A]">
            <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z" fill="currentColor"/>
          </svg>
          <div className="h-[1px] flex-1 bg-[#B79A5A]/60"></div>
        </motion.div>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center z-10 py-12"
          >
            <h3 className="text-3xl md:text-4xl text-[#26372C] mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Thank You</h3>
            <p className="text-[#70776F] text-center max-w-sm leading-relaxed" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your response has been received.<br/><br/>
              We look forward to celebrating<br/>
              with you at AALAM.
            </p>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B79A5A] mt-8 opacity-60">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/>
            </svg>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            onSubmit={handleSubmit} 
            className="w-full max-w-[650px] space-y-8 md:space-y-10 z-10 text-left relative"
          >
            {/* NAME */}
            <div>
              <label className="flex items-center text-[#26372C] text-[12px] uppercase tracking-[3px] font-sans mb-3">
                <User size={14} className="mr-3 text-[#B79A5A]" />
                Name / Family Name
              </label>
              <input
                type="text"
                required
                className="w-full h-[52px] bg-[#FAF7EF] border border-[#B79A5A]/40 rounded-sm px-4 text-[#26372C] focus:outline-none focus:border-[#B79A5A] focus:shadow-[0_0_15px_rgba(183,154,90,0.15)] transition-all placeholder-[#70776F]/50 font-serif text-lg"
                placeholder="E.g. John Doe & Family"
                value={formData.name}
                onChange={e => {
                  setFormData({...formData, name: e.target.value});
                  if (errorMsg) setErrorMsg('');
                }}
              />
            </div>
            
            {/* ATTENDANCE */}
            <div>
              <label className="flex items-center text-[#26372C] text-[12px] uppercase tracking-[3px] font-sans mb-3">
                <CheckCircle2 size={14} className="mr-3 text-[#B79A5A]" />
                Will you attend?
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, attendance: true})}
                  className={`flex-1 min-h-[56px] rounded-sm border flex items-center justify-center space-x-3 transition-all duration-300 font-serif text-lg ${formData.attendance ? 'border-[#B79A5A] bg-[#24352A] text-[#FAF7EF]' : 'border-[#B79A5A]/40 bg-transparent text-[#70776F] hover:border-[#B79A5A]/80'}`}
                >
                  {formData.attendance ? <CheckCircle2 size={18} className="text-[#B79A5A]" /> : <Circle size={18} className="text-[#70776F]/50" />}
                  <span>Joyfully Accept</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, attendance: false})}
                  className={`flex-1 min-h-[56px] rounded-sm border flex items-center justify-center space-x-3 transition-all duration-300 font-serif text-lg ${!formData.attendance ? 'border-[#B79A5A]/60 bg-[#E8E4D9] text-[#26372C]' : 'border-[#B79A5A]/40 bg-transparent text-[#70776F] hover:border-[#B79A5A]/80'}`}
                >
                  {!formData.attendance ? <CheckCircle2 size={18} className="text-[#26372C]" /> : <Circle size={18} className="text-[#70776F]/50" />}
                  <span>Regretfully Decline</span>
                </button>
              </div>
            </div>

            {/* TOTAL GUESTS */}
            <AnimatePresence>
              {formData.attendance && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '2.5rem' }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  className="overflow-hidden"
                >
                  <label className="flex items-center text-[#26372C] text-[12px] uppercase tracking-[3px] font-sans mb-3">
                    <Users size={14} className="mr-3 text-[#B79A5A]" />
                    Total Guests
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-[52px] bg-[#FAF7EF] border border-[#B79A5A]/40 rounded-sm px-4 text-[#26372C] focus:outline-none focus:border-[#B79A5A] focus:shadow-[0_0_15px_rgba(183,154,90,0.15)] transition-all font-serif text-lg appearance-none cursor-pointer"
                      value={formData.guestCount}
                      onChange={e => setFormData({...formData, guestCount: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B79A5A] pointer-events-none" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* MESSAGE */}
            <div>
              <label className="flex items-center text-[#26372C] text-[12px] uppercase tracking-[3px] font-sans mb-3">
                <MessageSquare size={14} className="mr-3 text-[#B79A5A]" />
                Message (Optional)
              </label>
              <textarea
                className="w-full bg-[#FAF7EF] border border-[#B79A5A]/40 rounded-sm p-4 text-[#26372C] focus:outline-none focus:border-[#B79A5A] focus:shadow-[0_0_15px_rgba(183,154,90,0.15)] transition-all placeholder-[#70776F]/50 font-serif text-lg resize-none"
                placeholder="Leave a message for the hosts..."
                rows={3}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
              />
            </div>

            {status === 'error' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                <p className="text-[#8E4B4B] text-sm tracking-wide font-sans">{errorMsg}</p>
              </motion.div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="flex justify-center pt-4 pb-8">
              <div className="flex items-center justify-center space-x-6 w-full">
                <div className="h-[1px] flex-1 bg-[#B79A5A]/30 max-w-[60px] hidden sm:block"></div>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B79A5A] hidden sm:block"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/></svg>
                
                <motion.button
                  whileHover={{ y: -2, boxShadow: '0 5px 20px rgba(183, 154, 90, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-[260px] min-h-[54px] bg-[#24352A] border border-[#B79A5A] rounded-full flex items-center justify-center space-x-3 text-[#F4ECDD] transition-all disabled:opacity-70 group cursor-pointer"
                >
                  <Send size={16} className="text-[#B79A5A] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <span className="text-[12px] tracking-[3px] font-sans uppercase font-medium">{status === 'submitting' ? 'Sending...' : 'Send RSVP'}</span>
                </motion.button>
                
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#B79A5A] hidden sm:block"><path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="currentColor"/></svg>
                <div className="h-[1px] flex-1 bg-[#B79A5A]/30 max-w-[60px] hidden sm:block"></div>
              </div>
            </div>

          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

const Invitation = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/song.mp3');
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
      setIsPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="font-sans text-[#283027]">
      <AnimatePresence>
        {!isOpened && <InvitationCover config={config} onOpen={handleOpen} />}
      </AnimatePresence>

      {isOpened && (
        <>

          <button
            onClick={toggleMusic}
            className="fixed top-6 right-6 z-40 w-10 h-10 rounded-full bg-[#263127]/20 backdrop-blur-md flex items-center justify-center text-[#B59A62] hover:bg-[#263127]/30 transition-colors border border-[#B59A62]/30"
          >
            {isPlaying ? <Music size={18} /> : <VolumeX size={18} />}
          </button>
          
          <main>
            <SectionIntro />
            <SectionFamily />
            <SectionLocation />
            <SectionRSVP />
          </main>
          
          <footer className="py-8 bg-[#263127] text-center">
            <p className="text-[#F7F2E8]/40 text-xs tracking-widest uppercase">Created with ♥ for {config.houseName}</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Invitation;
