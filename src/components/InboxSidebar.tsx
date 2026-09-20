'use client';

import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { EMAILS } from '@/lib/data';
import {
  Inbox, Star, Send, FileText, Pencil, Cloud, Tag,
  AlertCircle, Trash2
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: Inbox, label: 'Recibidos', active: true, countKey: 'inbox' as const },
  { icon: Star, label: 'Destacados', active: false },
  { icon: Send, label: 'Enviados', active: false },
  { icon: FileText, label: 'Borradores', active: false },
  { icon: Tag, label: 'Etiquetas', active: false },
  { icon: AlertCircle, label: 'Spam', active: false },
  { icon: Trash2, label: 'Papelera', active: false },
];

export default function InboxSidebar() {
  const { visibleEmailIds, readEmailIds, goBackToInbox, currentView } = useApp();

  const unreadCount = visibleEmailIds.filter(id => !readEmailIds.has(id)).length;

  return (
    <motion.aside
      style={{
        width: 240,
        minHeight: '100vh',
        background: '#161b22',
        borderRight: '1px solid rgba(48,54,61,0.6)',
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 12px',
        flexShrink: 0,
      }}
      initial={{ x: -240, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px', marginBottom: 20 }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: 'linear-gradient(135deg, #1a73e8, #4285f4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(26,115,232,0.25)',
        }}>
          <Cloud size={18} color="#fff" />
        </div>
        <div>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e6edf3', lineHeight: 1.2 }}>CloudMail</p>
          <p style={{ fontSize: '0.62rem', color: '#484f58' }}>Google Consulting</p>
        </div>
      </div>

      {/* Compose button */}
      <motion.button
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 20px', marginBottom: 20,
          borderRadius: 16,
          background: 'linear-gradient(135deg, #1a73e8, #4285f4)',
          color: '#fff', fontWeight: 600, fontSize: '0.85rem',
          border: 'none', cursor: 'default',
          boxShadow: '0 4px 12px rgba(26,115,232,0.25)',
          fontFamily: 'inherit',
        }}
        whileHover={{ scale: 1.02 }}
      >
        <Pencil size={16} />
        Redactar
      </motion.button>

      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;
          return (
            <button
              key={item.label}
              onClick={isActive && currentView === 'reading' ? goBackToInbox : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px',
                borderRadius: 10,
                background: isActive ? 'rgba(26,115,232,0.12)' : 'transparent',
                border: 'none',
                cursor: isActive ? 'pointer' : 'default',
                width: '100%',
                textAlign: 'left',
                transition: 'background 0.15s',
                fontFamily: 'inherit',
              }}
              onMouseEnter={e => {
                if (isActive) e.currentTarget.style.background = 'rgba(26,115,232,0.18)';
              }}
              onMouseLeave={e => {
                if (isActive) e.currentTarget.style.background = 'rgba(26,115,232,0.12)';
              }}
            >
              <Icon size={18} color={isActive ? '#4285f4' : '#8b949e'} />
              <span style={{
                fontSize: '0.82rem',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#e6edf3' : '#8b949e',
                flex: 1,
              }}>
                {item.label}
              </span>
              {item.countKey === 'inbox' && unreadCount > 0 && (
                <span style={{
                  fontSize: '0.7rem', fontWeight: 700,
                  background: '#1a73e8', color: '#fff',
                  padding: '2px 7px', borderRadius: 10,
                  minWidth: 20, textAlign: 'center',
                }}>
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Storage indicator */}
      <div style={{ padding: '12px 14px', borderTop: '1px solid rgba(48,54,61,0.4)', marginTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: '0.7rem', color: '#484f58' }}>Almacenamiento</span>
          <span style={{ fontSize: '0.7rem', color: '#484f58' }}>2.4 GB de 15 GB</span>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: 'rgba(48,54,61,0.5)', overflow: 'hidden' }}>
          <div style={{ width: '16%', height: '100%', background: 'linear-gradient(90deg, #1a73e8, #4285f4)', borderRadius: 2 }} />
        </div>
      </div>
    </motion.aside>
  );
}
