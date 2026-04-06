import React, { useRef, useEffect, useState } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductARButtonProps {
  modelUrl?: string;
  productName: string;
}

const ProductARButton: React.FC<ProductARButtonProps> = ({ modelUrl, productName }) => {
  const viewerRef = useRef<any>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [showIncompatibility, setShowIncompatibility] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Dynamic loading of model-viewer script if not already present
    const scriptId = 'google-model-viewer-script';
    if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
        document.head.appendChild(script);
    }
    
    // Check for AR support (simplified check)
    const canDoAR = !!(
      (navigator as any).xr || 
      /iPhone|iPad|iPod/.test(navigator.userAgent) || 
      /Android/.test(navigator.userAgent)
    );
    setIsSupported(canDoAR);
  }, []);

  if (!modelUrl) return null; // Don't show AR button if no 3D model exists

  const handleARClick = () => {
    if (viewerRef.current && isReady) {
        try {
            viewerRef.current.activateAR();
        } catch (e) {
            console.error('AR activation failed', e);
            setShowIncompatibility(true);
            setTimeout(() => setShowIncompatibility(false), 3000);
        }
    } else if (!isReady) {
        console.warn('Model not loaded yet, please wait.');
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={handleARClick}
        disabled={!isSupported}
        className={`w-full rounded-full border px-6 py-4 text-sm uppercase tracking-[0.35em] transition flex items-center justify-center gap-3 shadow-lg group relative overflow-hidden ${
          !isSupported 
          ? 'border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed opacity-60' 
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-950 hover:text-white hover:border-slate-950'
        }`}
      >
        <div className={`absolute inset-0 bg-brand-gold/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500`} />
        
        <Camera className={`w-4 h-4 transition-colors ${isSupported ? 'text-brand-gold group-hover:text-white' : 'text-slate-300'}`} />
        <span className="relative z-10">
            {!isSupported ? 'AR Not Supported' : isReady ? 'View in Your Space' : 'Calibrating 3D...'}
        </span>
        
        {isSupported && isReady && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-brand-gold rounded-full animate-ping" />
        )}
      </button>

      {/* Hidden viewer to trigger AR */}
      {/* @ts-ignore */}
      <model-viewer
        ref={viewerRef}
        src={modelUrl}
        alt={`A 3D model of ${productName} for AR preview`}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        draco-decoder-path="https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
        onLoad={() => setIsReady(true)}
        style={{ display: 'none' }}
      />

      <AnimatePresence>
        {showIncompatibility && (
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 10 }}
             className="absolute -top-12 left-0 right-0 bg-red-500 text-white p-2 rounded-xl text-[8px] uppercase tracking-widest text-center shadow-xl border border-white"
           >
             <div className="flex items-center justify-center gap-2">
                <AlertCircle className="w-3 h-3" />
                <span>Device Compatibility Error</span>
             </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductARButton;
