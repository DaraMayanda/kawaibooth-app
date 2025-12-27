import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Heart, Star, Sparkles, Trash2, 
  Download, ChevronLeft, Palette, 
  Flame, Moon, CameraIcon, RefreshCcw,
  Layers, Smile, X, Check, Clock, Music
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DATA TYPES ---
type Category = 'BADDIE' | 'CUTE' | 'MINIMALIST' | 'BUCIN' | 'VINTAGE';

interface Preset {
  id: string;
  name: string;
  defaultBg: string;
  pattern: string;
  textColor: string;
  stickers: string[];
  spotify?: boolean;
}

const CATEGORIES: Record<Category, { icon: any, label: string, color: string }> = {
  BADDIE: { icon: Flame, label: 'Baddie', color: '#ff0055' },
  VINTAGE: { icon: CameraIcon, label: 'Vintage', color: '#78350f' },
  CUTE: { icon: Star, label: 'Cute', color: '#ffb7c5' },
  MINIMALIST: { icon: Moon, label: 'Minimalist', color: '#57534e' },
  BUCIN: { icon: Heart, label: 'Bucin', color: '#e11d48' }
};

const PRESETS: Record<Category, Preset[]> = {
  BADDIE: [
    { id: 'b1', name: 'Dark Knight', defaultBg: '#09090b', pattern: '⛓️', textColor: '#ff0033', stickers: ['⛓️', '🎱', '💄', '🖤', '🩸', '💣'] },
    { id: 'b2', name: 'Hellfire', defaultBg: '#1a0000', pattern: '🔥', textColor: '#ff4d00', stickers: ['🔥', '🧨', '🧧', '🚬', '🕶️', '🍷'] },
    { id: 'b3', name: 'Cyber', defaultBg: '#0d001a', pattern: '🧬', textColor: '#00f2ff', stickers: ['🧬', '🛸', '👾', '💿', '🧪', '📡'] },
    { id: 'b4', name: 'Venom', defaultBg: '#051405', pattern: '🐍', textColor: '#39ff14', stickers: ['🐍', '🧪', '🦂', '🥦', '🦠', '🧤'] },
    { id: 'b5', name: 'Street', defaultBg: '#1c1917', pattern: '🛹', textColor: '#ffffff', stickers: ['👟', '🔥', '🛹', '🎧', '🧤', '💣'] },
    { id: 'b6', name: 'Glam', defaultBg: '#1e1b4b', pattern: '💎', textColor: '#f472b6', stickers: ['💎', '🥂', '💅', '💸', '✨', '🤳'] },
    { id: 'b7', name: 'Ace', defaultBg: '#000000', pattern: '♠️', textColor: '#ffffff', stickers: ['♠️', '🃏', '🎲', '💰', '🚬', '🥃'] },
    { id: 'b8', name: 'Gothic', defaultBg: '#1a1a1a', pattern: '蝙', textColor: '#8b0000', stickers: ['🦇', '⚰️', '🕯️', '🕸️', '🌙', '🥀'] },
    { id: 'b9', name: 'Voltage', defaultBg: '#000000', pattern: '⚡', textColor: '#ffff00', stickers: ['⚡', '🚧', '☢️', '🔊', '🔋', '🔌'] },
    { id: 'b10', name: 'Anarchy', defaultBg: '#111111', pattern: '🅰️', textColor: '#dc2626', stickers: ['🅰️', '🏴‍☠️', '⛓️', '🧨', '🚬', '🔥'] },
  ],
  VINTAGE: [
    { id: 'v1', name: '90s Film', defaultBg: '#f4ecd8', pattern: '🎞️', textColor: '#5c4033', stickers: ['🎞️', '📻', '📼', '☎️', '📺', '📽️'] },
    { id: 'v2', name: 'Sepia', defaultBg: '#d6d3d1', pattern: '📜', textColor: '#44403c', stickers: ['📜', '🕯️', '🖋️', '🗝️', '🕰️', '🧸'] },
    { id: 'v3', name: 'Grunge', defaultBg: '#1a1a1a', pattern: '🚬', textColor: '#ffffff', stickers: ['🚬', '🕶️', '🍷', '🎸', '📼', '💣'] },
    { id: 'v4', name: 'Disco', defaultBg: '#9a3412', pattern: '🕺', textColor: '#fbbf24', stickers: ['🕺', '🪩', '🌻', '☮️', '🎸', '🌈'] },
    { id: 'v5', name: 'Antique', defaultBg: '#2d241e', pattern: '⚜️', textColor: '#d4af37', stickers: ['⚜️', '🗝️', '📜', '🕰️', '🕯️', '🖋️'] },
    { id: 'v6', name: 'Retro', defaultBg: '#334155', pattern: '🕹️', textColor: '#f87171', stickers: ['🕹️', '👾', '🍕', '🥤', '🛹', '📟'] },
    { id: 'v7', name: 'Vinyl', defaultBg: '#171717', pattern: '💿', textColor: '#a3a3a3', stickers: ['💿', '🎸', '🎧', '🎙️', '📻', '🎵'] },
    { id: 'v8', name: 'Kodak', defaultBg: '#fbbf24', pattern: '📸', textColor: '#1e1b4b', stickers: ['📸', '🎞️', '🖼️', '🎨', '🔦', '🔋'] },
    { id: 'v9', name: 'Paper', defaultBg: '#f5f5f4', pattern: '🗞️', textColor: '#44403c', stickers: ['🗞️', '✉️', '🖋️', '📦', '🏷️', '📎'] },
    { id: 'v10', name: 'Denim', defaultBg: '#1e3a8a', pattern: '👖', textColor: '#bfdbfe', stickers: ['👖', '👟', '🧢', '👕', '🕶️', '🛹'] },
  ],
  CUTE: [
    { id: 'c1', name: 'Space Bunny', defaultBg: '#f5f3ff', pattern: '🪐', textColor: '#8b5cf6', stickers: ['🪐', '⭐', '🚀', '🐰', '🛸', '🥕'] },
    { id: 'c2', name: 'Mochi', defaultBg: '#fff7ed', pattern: '🍡', textColor: '#ea580c', stickers: ['🍡', '🍵', '🍊', '🐱', '🎐', '🏮'] },
    { id: 'c3', name: 'Soda', defaultBg: '#ecfeff', pattern: '🥤', textColor: '#0891b2', stickers: ['🥤', '🍬', '🍒', '🧊', '🏄', '🌴'] },
    { id: 'c4', name: 'Beary', defaultBg: '#fff1f2', pattern: '🧸', textColor: '#fb7185', stickers: ['🧸', '🎀', '🍭', '🍓', '🍰', '🍼'] },
    { id: 'c5', name: 'Fairy', defaultBg: '#f0fdf4', pattern: '🧚', textColor: '#16a34a', stickers: ['🧚', '🦋', '🌸', '🍄', '🌿', '🪄'] },
    { id: 'c6', name: 'Dream', defaultBg: '#e0f2fe', pattern: '☁️', textColor: '#0284c7', stickers: ['☁️', '🌙', '✨', '🦄', '🌈', '🍦'] },
    { id: 'c7', name: 'Peach', defaultBg: '#fff7ed', pattern: '🍑', textColor: '#f97316', stickers: ['🍑', '🍰', '🍮', '🌸', '🎀', '🍵'] },
    { id: 'c8', name: 'Pixel', defaultBg: '#f0f9ff', pattern: '👾', textColor: '#0ea5e9', stickers: ['👾', '🎮', '🕹️', '🍄', '⭐', '🍎'] },
    { id: 'c9', name: 'Honey', defaultBg: '#fefce8', pattern: '🐝', textColor: '#854d0e', stickers: ['🐝', '🍯', '🌻', '🧇', '🥞', '🥐'] },
    { id: 'c10', name: 'Tulip', defaultBg: '#fdf2f8', pattern: '🌷', textColor: '#db2777', stickers: ['🌷', '🍃', '👒', '🧺', '🥯', '🍓'] },
  ],
  MINIMALIST: [
    { id: 'm1', name: 'Spotify W', defaultBg: '#ffffff', pattern: '🎵', textColor: '#000000', stickers: ['🎵', '🎧', '🎹', '🎙️', '💿', '🎸'], spotify: true },
    { id: 'm2', name: 'Spotify D', defaultBg: '#121212', pattern: '🎧', textColor: '#1db954', stickers: ['🎧', '📻', '🎹', '🎵', '💿', '🔊'], spotify: true },
    { id: 'm3', name: 'Gallery', defaultBg: '#fafaf9', pattern: '▫️', textColor: '#1c1917', stickers: ['🖼️', '🏛️', '🎭', '🗿', '🎨', '🏛️'] },
    { id: 'm4', name: 'Zen', defaultBg: '#fafaf9', pattern: '🎋', textColor: '#57534e', stickers: ['🎋', '🍵', '🪨', '🥢', '🐚', '🕊️'] },
    { id: 'm5', name: 'Arch', defaultBg: '#262626', pattern: '📏', textColor: '#e5e5e5', stickers: ['📏', '📐', '🏢', '🏗️', '🔳', '💻'] },
    { id: 'm6', name: 'Stone', defaultBg: '#71717a', pattern: '🧱', textColor: '#18181b', stickers: ['🧱', '🛠️', '⛓️', '🩶', '🌑', '🔌'] },
    { id: 'm7', name: 'Bone', defaultBg: '#f5f5f4', pattern: '🦴', textColor: '#44403c', stickers: ['🦴', '🕯️', '🌑', '🕰️', '📜', '🪶'] },
    { id: 'm8', name: 'Linen', defaultBg: '#e7e5e4', pattern: '🧵', textColor: '#78716c', stickers: ['🧵', '🧺', '🧼', '🧴', '🕯️', '☁️'] },
    { id: 'm9', name: 'Studio', defaultBg: '#ffffff', pattern: '🎬', textColor: '#000000', stickers: ['🎬', '🎥', '💡', '📽️', '🎞️', '🎙️'] },
    { id: 'm10', name: 'Grip', defaultBg: '#171717', pattern: '✖️', textColor: '#ffffff', stickers: ['✖️', '➕', '➖', '➗', '🔝', '🔛'] },
  ],
  BUCIN: [
    { id: 'l1', name: 'Love Poison', defaultBg: '#450a0a', pattern: '🥀', textColor: '#fca5a5', stickers: ['🥀', '🍷', '🎻', '📜', '🗝️', '🩸'] },
    { id: 'l2', name: 'Cupid', defaultBg: '#fff1f2', pattern: '💘', textColor: '#e11d48', stickers: ['❤️', '💍', '🌹', '💌', '🥂', '⛪'] },
    { id: 'l3', name: 'Sweet', defaultBg: '#fb7185', pattern: '💖', textColor: '#ffffff', stickers: ['💖', '🍰', '🧁', '🍬', '🧸', '🎁'] },
    { id: 'l4', name: 'Sunset', defaultBg: '#ffedd5', pattern: '🌅', textColor: '#f97316', stickers: ['🌅', '🌴', '🍹', '📸', '🐚', '🧡'] },
    { id: 'l5', name: 'Night', defaultBg: '#1e1b4b', pattern: '✨', textColor: '#818cf8', stickers: ['✨', '🌙', '🌌', '🔭', '🛸', '💘'] },
    { id: 'l6', name: 'Cinema', defaultBg: '#0c0a09', pattern: '🎬', textColor: '#e7e5e4', stickers: ['🎬', '🍿', '🥤', '📽️', '🎫', '🎭'] },
    { id: 'l7', name: 'Polaroid', defaultBg: '#ffffff', pattern: '📸', textColor: '#1c1917', stickers: ['📸', '🖼️', '🖋️', '📎', '🗓️', '📍'] },
    { id: 'l8', name: 'Aesthetic', defaultBg: '#fef2f2', pattern: '🌸', textColor: '#f43f5e', stickers: ['🌸', '🍃', '🕊️', '☁️', '🧺', '🍓'] },
    { id: 'l9', name: 'Deep', defaultBg: '#0f172a', pattern: '🌊', textColor: '#38bdf8', stickers: ['🌊', '🐚', '🐋', '⚓', '🏝️', '💙'] },
    { id: 'l10', name: 'Cherish', defaultBg: '#ecfdf5', pattern: '🍀', textColor: '#059669', stickers: ['🍀', '🚲', '🧺', '🥯', '🍃', '👒'] },
  ]
};

export default function App() {
  const [view, setView] = useState<'home' | 'studio'>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('BADDIE');
  const [activePreset, setActivePreset] = useState<Preset>(PRESETS['BADDIE'][0]);
  const [customBg, setCustomBg] = useState(activePreset.defaultBg);
  const [photos, setPhotos] = useState<string[]>([]);
  const [stickers, setStickers] = useState<{id: number, icon: string, x: number, y: number}[]>([]);
  const [layoutCount, setLayoutCount] = useState<number>(4);
  const [timer, setTimer] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finalCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setCustomBg(activePreset.defaultBg);
  }, [activePreset]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720, facingMode: 'user' } 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) { console.error(err); }
  };

  const handleCaptureRequest = () => {
    if (photos.length >= layoutCount || isCapturing || timer !== null) return;
    setTimer(3);
  };

  useEffect(() => {
    if (timer === null) return;
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    } else {
      executeCapture();
      setTimer(null);
    }
  }, [timer]);

  const executeCapture = () => {
    setIsCapturing(true);
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          // Fixed aspect ratio capture to match layout (4:3)
          canvasRef.current.width = 1000;
          canvasRef.current.height = 750;
          ctx.save();
          ctx.translate(1000, 0);
          ctx.scale(-1, 1);
          
          // Center-crop video to 4:3
          const vW = videoRef.current.videoWidth;
          const vH = videoRef.current.videoHeight;
          const targetRatio = 4/3;
          let sW = vW;
          let sH = vW / targetRatio;
          if (sH > vH) {
            sH = vH;
            sW = vH * targetRatio;
          }
          const sx = (vW - sW) / 2;
          const sy = (vH - sH) / 2;

          ctx.drawImage(videoRef.current, sx, sy, sW, sH, 0, 0, 1000, 750);
          ctx.restore();
          setPhotos(prev => [...prev, canvasRef.current!.toDataURL('image/jpeg', 0.95)]);
        }
      }
      setIsCapturing(false);
    }, 150);
  };

  const saveToGallery = async () => {
    const canvas = finalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 450;
    const padding = 40;
    const photoW = W - (padding * 2);
    const photoH = (photoW * 3) / 4;
    const gap = 20;
    const headerH = 70;
    const footerH = 100;
    
    // Calculate total height based on actual number of photos taken
    const totalH = headerH + (photoH + gap) * layoutCount + footerH;
    canvas.width = W;
    canvas.height = totalH;

    // Background
    ctx.fillStyle = customBg;
    ctx.fillRect(0, 0, W, totalH);

    // Motif Pattern (Filled more densely)
    ctx.globalAlpha = 0.12;
    ctx.font = '30px serif';
    for (let x = 0; x < W + 50; x += 60) {
      for (let y = 0; y < totalH + 50; y += 60) {
        ctx.fillText(activePreset.pattern, x, y);
      }
    }
    ctx.globalAlpha = 1.0;

    // Render Photos
    for (let i = 0; i < layoutCount; i++) {
      if (photos[i]) {
        const img = new Image();
        img.src = photos[i];
        await new Promise(r => img.onload = r);
        ctx.drawImage(img, padding, headerH + (photoH + gap) * i, photoW, photoH);
      }
    }

    // Stickers
    ctx.font = '45px serif';
    for (const s of stickers) {
        ctx.fillText(s.icon, (s.x / 100) * W, (s.y / 100) * totalH);
    }

    // Small Watermark Footer (Positioned at corner)
    ctx.fillStyle = activePreset.textColor;
    if (activePreset.spotify) {
        ctx.fillRect(padding, totalH - 60, photoW, 2);
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText("Kawaibooth", padding, totalH - 70);
    } else {
        ctx.textAlign = 'right';
        ctx.font = 'italic bold 14px serif';
        ctx.fillText("Kawaibooth", W - padding, totalH - 40);
        ctx.font = '7px sans-serif';
        ctx.globalAlpha = 0.4;
        ctx.fillText(`C 2025 • ARCHIVE`, W - padding, totalH - 30);
    }

    const link = document.createElement('a');
    link.download = `kawaibooth-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (view === 'home') {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center p-8">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
          <h1 className="text-7xl font-black italic mb-2">Kawaibooth</h1>
          <p className="text-[9px] tracking-[1em] uppercase text-stone-400 mb-16">Premium Digital Photostrip</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl">
            {(Object.keys(CATEGORIES) as Category[]).map(cat => (
              <button 
                key={cat}
                onClick={() => { setActiveCategory(cat); setActivePreset(PRESETS[cat][0]); setView('studio'); startCamera(); }}
                className="group flex flex-col items-center gap-4 p-8 rounded-[3rem] bg-white border border-stone-100 hover:border-black transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-stone-50 group-hover:bg-black group-hover:text-white transition-colors">
                  {React.createElement(CATEGORIES[cat].icon, { size: 24 })}
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-stone-100 flex overflow-hidden font-sans text-zinc-900">
      {/* LEFT: CAMERA AREA */}
      <div className="flex-1 relative flex flex-col border-r bg-white">
        <div className="p-4 border-b flex justify-between items-center bg-white z-20">
            <button onClick={() => setView('home')} className="p-2 hover:bg-stone-100 rounded-full transition-colors"><ChevronLeft size={20}/></button>
            <div className="flex gap-2">
               {[1, 2, 4, 6, 8].map(n => (
                 <button 
                  key={n} 
                  onClick={() => {setLayoutCount(n); setPhotos([])}}
                  className={`text-[10px] font-black w-10 h-10 rounded-full border transition-all ${layoutCount === n ? 'bg-black text-white border-black' : 'bg-stone-50 border-stone-100 text-stone-400'}`}
                 >
                   {n}
                 </button>
               ))}
            </div>
            <div className="w-10" />
        </div>

        <div className="flex-1 flex items-center justify-center p-8 bg-stone-50 relative">
          <div className="relative w-full max-w-2xl aspect-[4/3] bg-black rounded-[2.5rem] overflow-hidden shadow-2xl">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover scale-x-[-1]" />
            <AnimatePresence>
              {timer !== null && (
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-30">
                  <span className="text-[10rem] font-black italic text-white drop-shadow-2xl">{timer}</span>
                </motion.div>
              )}
            </AnimatePresence>
            {isCapturing && <div className="absolute inset-0 bg-white z-40" />}
          </div>
        </div>

        <div className="h-28 bg-white border-t flex items-center justify-center gap-8 px-8">
           <button onClick={() => setPhotos([])} className="p-3 rounded-full hover:bg-red-50 text-stone-300 hover:text-red-400 transition-colors"><RefreshCcw size={20}/></button>
           
           <button 
             onClick={handleCaptureRequest}
             disabled={photos.length >= layoutCount || timer !== null}
             className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-20"
           >
             <Camera size={32} />
           </button>

           <div className="flex -space-x-3 overflow-hidden">
              {photos.map((p, i) => (
                <div key={i} className="w-12 h-12 rounded-lg border-2 border-white bg-stone-200 overflow-hidden shadow-sm">
                  <img src={p} className="w-full h-full object-cover" />
                </div>
              ))}
              {Array.from({length: Math.max(0, layoutCount - photos.length)}).map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-lg border-2 border-dashed border-stone-200 bg-stone-50" />
              ))}
           </div>
        </div>
      </div>

      {/* RIGHT: CUSTOMIZER AREA */}
      <div className="w-[450px] bg-white flex flex-col shadow-2xl z-10">
        <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
          
          {/* PREVIEW TICKET */}
          <div className="flex justify-center">
            <div 
              className="w-[260px] p-6 shadow-2xl relative transition-all duration-500 origin-top"
              style={{ backgroundColor: customBg }}
            >
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 flex flex-wrap gap-4 p-4 text-xl">
                   {Array.from({length: 40}).map((_, i) => <span key={i}>{activePreset.pattern}</span>)}
                </div>

                <div className="space-y-3 relative z-10">
                    {Array.from({length: layoutCount}).map((_, i) => (
                      <div key={i} className="aspect-[4/3] bg-black/5 rounded-sm overflow-hidden relative group">
                         {photos[i] ? (
                            <>
                                <img src={photos[i]} className="w-full h-full object-cover" />
                                <button onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))} className="absolute top-1 right-1 p-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={10}/></button>
                            </>
                         ) : (
                             <div className="w-full h-full flex items-center justify-center opacity-10"><Camera size={14}/></div>
                         )}
                      </div>
                    ))}
                </div>

                {stickers.map(s => (
                    <motion.div drag dragMomentum={false} key={s.id} className="absolute text-4xl z-20 cursor-move" style={{ top: `${s.y}%`, left: `${s.x}%` }}>
                        {s.icon}
                    </motion.div>
                ))}

                <div className="mt-8 relative" style={{ color: activePreset.textColor }}>
                    {activePreset.spotify ? (
                        <div className="opacity-80">
                             <div className="h-0.5 w-full bg-current/20 mb-2" />
                             <div className="flex justify-between items-center">
                                <span className="text-[8px] font-bold tracking-tighter">KAWAIBOOTH PLAYER</span>
                                <Music size={10} />
                             </div>
                        </div>
                    ) : (
                        <div className="text-right">
                            <p className="text-sm font-serif italic font-black">Kawaibooth</p>
                            <p className="text-[5px] uppercase tracking-widest opacity-40">Archive C 2025</p>
                        </div>
                    )}
                </div>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="space-y-8">
            <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">Tema: {activeCategory}</h3>
                <div className="grid grid-cols-2 gap-2">
                    {PRESETS[activeCategory].map(p => (
                        <button 
                            key={p.id} 
                            onClick={() => setActivePreset(p)}
                            className={`px-4 py-3 rounded-2xl text-[10px] font-bold border transition-all ${activePreset.id === p.id ? 'bg-black text-white border-black shadow-lg' : 'bg-stone-50 border-stone-100 text-stone-400'}`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </section>

            <section className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Warna Frame</span>
                    <button onClick={() => setShowColorPicker(!showColorPicker)} className="text-[10px] font-black text-rose-500 uppercase">{showColorPicker ? 'Tutup' : 'Ubah'}</button>
                </div>
                {showColorPicker ? (
                    <input type="color" value={customBg} onChange={e => setCustomBg(e.target.value)} className="w-full h-10 rounded-xl cursor-pointer bg-transparent border-none" />
                ) : (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border shadow-sm" style={{ backgroundColor: customBg }} />
                        <span className="text-[10px] font-mono font-bold">{customBg.toUpperCase()}</span>
                    </div>
                )}
            </section>

            <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-4">Klik Stiker untuk Tambah</h3>
                <div className="grid grid-cols-6 gap-2">
                    {activePreset.stickers.map((s, i) => (
                        <button 
                            key={i} 
                            onClick={() => setStickers([...stickers, { id: Date.now(), icon: s, x: 40, y: 40 }])}
                            className="aspect-square flex items-center justify-center text-2xl bg-stone-50 rounded-xl hover:scale-110 active:scale-90 transition-all border border-transparent hover:border-stone-200"
                        >
                            {s}
                        </button>
                    ))}
                    <button onClick={() => setStickers([])} className="aspect-square flex items-center justify-center bg-stone-100 text-stone-400 rounded-xl hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                </div>
            </section>
          </div>
        </div>

        <div className="p-8 border-t bg-stone-50/30">
          <button 
            onClick={saveToGallery}
            disabled={photos.length === 0}
            className="w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-stone-800 transition-all flex items-center justify-center gap-2 disabled:opacity-20"
          >
            <Download size={16} /> Simpan Foto
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      <canvas ref={finalCanvasRef} className="hidden" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f5f5f4; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}