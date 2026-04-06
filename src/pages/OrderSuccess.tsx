import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-brand-beige/10 flex items-center justify-center">
      <style>{`
        @keyframes driveAcross {
          0%   { transform: translateX(-220px); }
          100% { transform: translateX(calc(100vw + 220px)); }
        }
        @keyframes wheelSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes bodyBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-2px); }
        }
        @keyframes roadMove {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-120px); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.15) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes speedLine {
          0%   { opacity: 0.55; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-20px); }
        }

        .scene-wrapper {
          width: 100%;
          max-width: 640px;
          margin: 0 auto 36px;
          position: relative;
          overflow: hidden;
          height: 140px;
        }
        .road-line {
          position: absolute;
          bottom: 10px;
          left: 0;
          width: 100%;
          height: 4px;
          background: #1a1a1a;
          border-radius: 2px;
          transition: background 0.3s;
        }
        .road-dashes {
          position: absolute;
          bottom: 19px;
          left: 0;
          display: flex;
          gap: 0;
          animation: roadMove 1.8s linear infinite;
        }
        .dash {
          width: 60px;
          height: 3px;
          background: #1a1a1a;
          margin-right: 60px;
          border-radius: 2px;
          flex-shrink: 0;
          transition: background 0.3s;
        }
        .scooty-group {
          position: absolute;
          bottom: 13px;
          left: 0;
          animation: driveAcross 9s linear infinite;
        }
        .body-bob {
          animation: bodyBob 0.9s ease-in-out infinite;
        }
        .wheel {
          transform-origin: center;
          animation: wheelSpin 1s linear infinite;
        }
        .speed-line   { animation: speedLine 0.9s ease-out infinite; }
        .speed-line-2 { animation: speedLine 0.9s ease-out infinite 0.2s; }
        .speed-line-3 { animation: speedLine 0.9s ease-out infinite 0.4s; }

        .check-icon {
          animation: checkPop 0.6s cubic-bezier(.36,.07,.19,.97) both;
        }
        .text-fade   { animation: fadeSlideUp 0.7s ease both; }
        .text-fade-1 { animation-delay: 0.15s; }
        .text-fade-2 { animation-delay: 0.30s; }
        .text-fade-3 { animation-delay: 0.45s; }

        /* Default: black fill/stroke */
        .scooty-svg .c-fill   { fill: #1a1a1a; transition: fill 0.35s; }
        .scooty-svg .c-stroke { stroke: #1a1a1a; transition: stroke 0.35s; }
        .scooty-svg .sl-stroke { stroke: #1a1a1a; transition: stroke 0.35s; }

        /* Hover: warm brown */
        .scene-wrapper:hover .scooty-svg .c-fill   { fill: #af957a; }
        .scene-wrapper:hover .scooty-svg .c-stroke { stroke: #af957a; }
        .scene-wrapper:hover .scooty-svg .sl-stroke { stroke: #af957a; }
        .scene-wrapper:hover .road-line { background: #af957a; }
        .scene-wrapper:hover .dash      { background: #af957a; }
      `}</style>

      <div className="max-w-3xl w-full px-6 text-center">

        {/* ── Check Icon ── */}
        <div className="check-icon inline-flex items-center justify-center w-24 h-24 rounded-full bg-brand-black text-white mx-auto mb-10">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" fill="none"/>
            <path d="M13 25l8 8 14-16" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* ── Scooty Scene ── */}
        <div className="scene-wrapper">
          <div className="road-dashes">
            {Array.from({ length: 16 }).map((_, i) => <div key={i} className="dash" />)}
          </div>
          <div className="road-line" />

          <div className="scooty-group">
            <div className="body-bob">
              <svg className="scooty-svg" width="190" height="125" viewBox="0 0 190 125" fill="none" xmlns="http://www.w3.org/2000/svg">

                {/* ── Delivery Box ── */}
                <rect x="52" y="18" width="40" height="28" rx="3" className="c-fill"/>
                <rect x="52" y="14" width="40" height="7"  rx="2" className="c-fill" opacity="0.85"/>
                {/* box inner lines */}
                <line x1="72" y1="18" x2="72" y2="46" stroke="white" strokeWidth="0.8" opacity="0.3"/>
                <line x1="52" y1="32" x2="92" y2="32" stroke="white" strokeWidth="0.8" opacity="0.3"/>
                {/* Atelier label */}
                <text x="72" y="30" textAnchor="middle" fill="white" fontSize="6.2"
                  fontFamily="Georgia, serif" letterSpacing="1.4" opacity="0.95">ATELIER</text>

                {/* ── Rider ── */}
                {/* Helmet */}
                <ellipse cx="116" cy="31" rx="14" ry="13" className="c-fill"/>
                {/* Visor glare */}
                <path d="M104 35 Q116 42 128 35" fill="white" opacity="0.1"/>
                <path d="M104 35 Q116 42 128 35" stroke="white" strokeWidth="1.2" fill="none" opacity="0.4" strokeLinecap="round"/>
                {/* Torso */}
                <path d="M100 65 Q104 50 116 47 L122 67 Q112 73 100 65Z" className="c-fill"/>
                {/* Arm */}
                <path d="M118 54 Q128 56 138 57" className="c-stroke" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" fill="none"/>
                {/* Leg */}
                <path d="M106 69 Q110 81 120 85" className="c-stroke" stroke="#1a1a1a" strokeWidth="5" strokeLinecap="round" fill="none"/>
                {/* Shoe */}
                <ellipse cx="122" cy="86" rx="8" ry="3.5" className="c-fill"/>

                {/* ── Scooty Body ── */}
                {/* Main panel */}
                <path d="M58 86 Q63 62 84 60 L138 62 Q153 64 156 83 L156 88 L58 88Z" className="c-fill"/>
                {/* Panel highlight */}
                <path d="M74 64 Q100 60 130 62" stroke="white" strokeWidth="1" opacity="0.08" fill="none" strokeLinecap="round"/>
                {/* Rear mudguard */}
                <path d="M58 86 Q50 84 44 89 L62 89Z" className="c-fill"/>
                {/* Front mudguard */}
                <path d="M156 83 Q164 81 168 87 L156 88Z" className="c-fill"/>
                {/* Footboard */}
                <rect x="92" y="87" width="36" height="5" rx="2" className="c-fill" opacity="0.65"/>
                {/* Handlebar post */}
                <rect x="135" y="52" width="5" height="13" rx="2" className="c-fill"/>
                {/* Handlebar */}
                <path d="M130 52 L144 52" className="c-stroke" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" fill="none"/>
                {/* Headlight */}
                <ellipse cx="160" cy="80" rx="5" ry="4" fill="white" opacity="0.25"/>
                <ellipse cx="160" cy="80" rx="3" ry="2.5" fill="white" opacity="0.45"/>
                {/* Windshield */}
                <path d="M124 62 Q130 53 140 55 L138 62Z" fill="white" opacity="0.1"/>

                {/* ── Rear Wheel ── */}
                <g transform="translate(64,91)">
                  <circle r="22" className="c-stroke" stroke="#1a1a1a" strokeWidth="4" fill="none"/>
                  <g className="wheel">
                    <line x1="0" y1="-15" x2="0"  y2="15"  stroke="white" strokeWidth="1.3" opacity="0.2"/>
                    <line x1="-15" y1="0" x2="15"  y2="0"   stroke="white" strokeWidth="1.3" opacity="0.2"/>
                    <line x1="-11" y1="-11" x2="11" y2="11" stroke="white" strokeWidth="1.3" opacity="0.2"/>
                    <line x1="11" y1="-11" x2="-11" y2="11" stroke="white" strokeWidth="1.3" opacity="0.2"/>
                  </g>
                  <circle r="6" className="c-fill"/>
                  <circle r="2.5" fill="white" opacity="0.25"/>
                </g>

                {/* ── Front Wheel ── */}
                <g transform="translate(150,91)">
                  <circle r="22" className="c-stroke" stroke="#1a1a1a" strokeWidth="4" fill="none"/>
                  <g className="wheel">
                    <line x1="0" y1="-15" x2="0"  y2="15"  stroke="white" strokeWidth="1.3" opacity="0.2"/>
                    <line x1="-15" y1="0" x2="15"  y2="0"   stroke="white" strokeWidth="1.3" opacity="0.2"/>
                    <line x1="-11" y1="-11" x2="11" y2="11" stroke="white" strokeWidth="1.3" opacity="0.2"/>
                    <line x1="11" y1="-11" x2="-11" y2="11" stroke="white" strokeWidth="1.3" opacity="0.2"/>
                  </g>
                  <circle r="6" className="c-fill"/>
                  <circle r="2.5" fill="white" opacity="0.25"/>
                </g>

                {/* ── Speed Lines ── */}
                <line className="speed-line   sl-stroke" x1="14" y1="70" x2="38" y2="70" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"/>
                <line className="speed-line-2 sl-stroke" x1="6"  y1="78" x2="34" y2="78" stroke="#1a1a1a" strokeWidth="1.6" strokeLinecap="round"/>
                <line className="speed-line-3 sl-stroke" x1="10" y1="86" x2="32" y2="86" stroke="#1a1a1a" strokeWidth="1.1" strokeLinecap="round"/>

              </svg>
            </div>
          </div>
        </div>

        {/* ── Text ── */}
        <h1 className="text-fade text-fade-1 text-5xl font-serif uppercase tracking-widest mb-6">
          Order Complete
        </h1>
        <p className="text-fade text-fade-2 text-gray-600 text-lg leading-relaxed mb-10">
          Your Atelier order has been confirmed. We are preparing your items with care and will send a shipping update shortly.
        </p>
        <div className="text-fade text-fade-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-4 bg-brand-black text-white uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="px-8 py-4 border border-brand-black text-brand-black uppercase tracking-widest text-sm hover:bg-brand-beige transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;