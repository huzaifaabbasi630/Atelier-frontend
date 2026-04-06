import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2, Rotate3d, Box } from 'lucide-react';

interface Product3DModalProps {
  isOpen: boolean;
  onClose: () => void;
  modelUrl?: string;
  productName: string;
}

export {};

const Product3DModal: React.FC<Product3DModalProps> = ({ isOpen, onClose, modelUrl, productName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Load script if not already present
      const scriptId = 'google-model-viewer-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
        document.head.appendChild(script);
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      >
        {/* Modal UI Layer */}
        <div className="absolute inset-x-8 top-8 flex items-start justify-between z-10">
          <div className="space-y-1">
             <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">Atelier Studio 3D</p>
             <h2 className="text-2xl font-serif text-brand-black">{productName}</h2>
          </div>
          
          <button 
            onClick={onClose}
            className="p-4 rounded-full bg-slate-50 border border-slate-100 luxury-shadow hover:bg-slate-100 transition-all text-slate-500 hover:text-brand-black"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute inset-x-8 bottom-8 flex justify-center z-10">
             <div className="bg-slate-900/5 backdrop-blur-md border border-slate-200/50 px-6 py-3 rounded-full flex items-center gap-6">
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-slate-500">
                    <Rotate3d className="w-3 h-3 text-brand-gold" />
                    <span>Rotate View</span>
                </div>
                <div className="w-px h-3 bg-slate-200" />
                <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest font-bold text-slate-500">
                    <Box className="w-3 h-3 text-brand-gold" />
                    <span>Zoom Enabled</span>
                </div>
             </div>
        </div>

        {/* 3D Model Rendering Layer */}
        <div className="w-full h-full relative">
           {isLoading && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        className="text-slate-100"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="60"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray={377}
                        initial={{ strokeDashoffset: 377 }}
                        animate={{ strokeDashoffset: 377 - (377 * progress) / 100 }}
                        className="text-brand-gold"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-serif text-brand-black">{Math.round(progress)}%</span>
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-slate-400 animate-pulse">Synthesizing Luxury Reality</p>
                    <p className="text-[9px] text-slate-300 uppercase tracking-widest italic">Optimizing High-Fidelity Geometry...</p>
                  </div>
              </div>
           )}

           {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 px-6">
                  <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center shadow-lg border border-red-100">
                    <X className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif text-slate-900">3D Simulation Unavailable</h3>
                  <p className="text-xs text-slate-500 max-w-xs uppercase tracking-widest leading-loose">We are unable to load the high-fidelity model at this moment. Please check your connectivity or try again later.</p>
              </div>
           )}

           {/* @ts-ignore */}
           <model-viewer
             src={modelUrl}
             alt={`A 3D model of ${productName}`}
             auto-rotate
             camera-controls
             touch-action="pan-y"
             shadow-intensity="1.5"
             environment-image="neutral"
             exposure="1"
             loading="eager"
             reveal="auto"
             interaction-prompt="none"
             draco-decoder-path="https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
             onProgress={(e: any) => {
                const p = e.detail.totalProgress * 100;
                setProgress(p);
              }}
              onLoad={() => {
                setProgress(100);
                setTimeout(() => setIsLoading(false), 500);
              }}
             onError={() => {
                setIsLoading(false);
                setHasError(true);
             }}
             style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
           />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Product3DModal;
