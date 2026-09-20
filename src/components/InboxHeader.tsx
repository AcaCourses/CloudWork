'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Search, Settings, Grid3X3, Bell, HelpCircle } from 'lucide-react';

export default function InboxHeader() {
  const { userName } = useApp();

  const initials = userName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <motion.header
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        background: '#161b22',
        borderBottom: '1px solid rgba(48,54,61,0.6)',
        gap: 16,
        flexShrink: 0,
      }}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Search bar */}
      <div style={{
        flex: 1,
        maxWidth: 680,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 16px',
        borderRadius: 10,
        background: 'rgba(13,17,23,0.6)',
        border: '1px solid rgba(48,54,61,0.6)',
      }}>
        <Search size={16} color="#8b949e" />
        <input
          type="text"
          placeholder="Buscar en correos..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e6edf3',
            fontSize: '0.85rem',
            fontFamily: 'inherit',
          }}
          readOnly
        />
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[HelpCircle, Settings, Grid3X3].map((Icon, i) => (
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

      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        background: 'linear-gradient(135deg, #1a73e8, #34a853)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '0.72rem', fontWeight: 700, color: '#fff',
        boxShadow: '0 0 0 2px rgba(26,115,232,0.2)',
        cursor: 'default',
      }}>
        {initials}
      </div>
    </motion.header>
  );
}
