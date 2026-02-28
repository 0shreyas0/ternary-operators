import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import disneyLogo from '../assets/disney-logo.png';
import disneyVideo from '../assets/Disney_Intro_Full_HD_1080p_1080p.mp4';

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [logoVisible, setLogoVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= 24 && !logoVisible) {
      video.pause();
      video.currentTime = 24;
      setLogoVisible(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Local Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <video
          ref={videoRef}
          src={disneyVideo}
          autoPlay
          muted
          playsInline
          onLoadedMetadata={(e) => { (e.target as HTMLVideoElement).currentTime = 1; }}
          onPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 2.75; }}
          onTimeUpdate={handleTimeUpdate}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '177.78vh',
            minWidth: '100%',
            height: '56.25vw',
            minHeight: '100%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Sound toggle button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-11 h-11 flex items-center justify-center text-xl backdrop-blur-md border border-white/20 transition-all"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>

      {/* Dark gradient overlay — only show once logo is visible */}
      <AnimatePresence>
        {logoVisible && (
          <motion.div
            className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/70 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>

      {/* Main Content — revealed after video pauses */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 w-full max-w-4xl">
        <AnimatePresence>
          {logoVisible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, type: 'spring', stiffness: 100 }}
              style={{
                width: '100%',
                height: '110px',
                WebkitMaskImage: `url(${disneyLogo})`,
                WebkitMaskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                backgroundImage: 'linear-gradient(135deg, #fff 0%, #ffe8a3 40%, #ffd166 70%, #fff 100%)',
              }}
            />
          )}
        </AnimatePresence>
      </div>

    </section>
  );
};

