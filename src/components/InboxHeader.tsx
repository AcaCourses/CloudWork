'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Search, Settings, Grid3X3, Cloud } from 'lucide-react';

export default function InboxHeader() {
  const { userName, currentView } = useApp();

  const initials = userName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* Responsive header styles */}
      <style>{`
        .inbox-header-search {
          flex: 1;
          max-width: 680px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          border-radius: 10px;
          background: rgba(13,17,23,0.6);
          border: 1px solid rgba(48,54,61,0.6);
        }
        .inbox-header-search input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #e6edf3;
          font-size: 0.85rem;
          font-family: inherit;
          min-width: 0;
        }
        .inbox-header-brand {
          display: none;
          align-items: center;
          gap: 8px;
        }
        .inbox-header-icons { display: flex; }

        @media (max-width: 768px) {
          /* On mobile: hide search, show brand */
          .inbox-header-search { display: none !important; }
          .inbox-header-brand  { display: flex !important; }
          /* Hide extra icon buttons on mobile */
          .inbox-header-icons  { display: none !important; }
        }
      `}</style>

      <motion.header
        style={{
          height: 56,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          background: '#161b22',
          borderBottom: '1px solid rgba(48,54,61,0.6)',
          gap: 12,
          flexShrink: 0,
        }}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* Mobile brand (replaces search on small screens) */}
        <div className="inbox-header-brand">
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: 'linear-gradient(135deg, #1a73e8, #4285f4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Cloud size={16} color="#fff" />
          </div>
          <span style={{ fontSize: '0.92rem', fontWeight: 700, color: '#e6edf3' }}>
            {currentView === 'reading' ? 'Correo' : 'CloudMail'}
          </span>
        </div>

        {/* Desktop search bar */}
        <div className="inbox-header-search">
          <Search size={16} color="#8b949e" />
          <input
            type="text"
            placeholder="Buscar en correos..."
            readOnly
          />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop icon buttons */}
        <div className="inbox-header-icons" style={{ alignItems: 'center', gap: 4 }}>
          {[Settings, Grid3X3].map((Icon, i) => (
            <button
              key={i}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'transparent', border: 'none', cursor: 'default',
              }}
            >
              <Icon size={18} color="#8b949e" />
            </button>
          ))}
        </div>

        {/* Avatar — always visible */}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1a73e8, #34a853)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.7rem', fontWeight: 700, color: '#fff',
          boxShadow: '0 0 0 2px rgba(26,115,232,0.25)',
          cursor: 'default', flexShrink: 0,
        }}>
          {initials}
        </div>
      </motion.header>
    </>
  );
}
