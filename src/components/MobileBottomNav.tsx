'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { Inbox, Star, Pencil, ArrowLeft } from 'lucide-react';

export default function MobileBottomNav() {
  const { currentView, visibleEmailIds, readEmailIds, goBackToInbox } = useApp();

  const unreadCount = visibleEmailIds.filter(id => !readEmailIds.has(id)).length;

  const isReading = currentView === 'reading';

  return (
    <nav className="mobile-bottom-nav" aria-label="Navegación móvil">
      {isReading ? (
        /* ── In reading mode: show back button prominently ─────── */
        <motion.button
          id="mobile-back-btn"
          onClick={goBackToInbox}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            flex: 1, justifyContent: 'center',
            padding: '10px 20px', borderRadius: 10,
            background: 'rgba(66,133,244,0.12)',
            border: '1px solid rgba(66,133,244,0.25)',
            color: '#4285f4', fontSize: '0.88rem', fontWeight: 700,
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <ArrowLeft size={18} />
          Volver a Recibidos
        </motion.button>
      ) : (
        /* ── In inbox mode: full tab bar ─────────────────────── */
        <>
          {/* Inbox tab */}
          <NavTab
            id="mobile-nav-inbox"
            icon={<Inbox size={22} />}
            label="Recibidos"
            active
            badge={unreadCount > 0 ? unreadCount : undefined}
          />

          {/* Starred tab (decorative) */}
          <NavTab
            id="mobile-nav-starred"
            icon={<Star size={22} />}
            label="Destacados"
            active={false}
          />

          {/* Compose FAB */}
          <motion.button
            id="mobile-compose-btn"
            whileTap={{ scale: 0.93 }}
            style={{
              width: 50, height: 50, borderRadius: 14,
              background: 'linear-gradient(135deg, #1a73e8, #4285f4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'default', flexShrink: 0,
              boxShadow: '0 4px 16px rgba(26,115,232,0.35)',
            }}
          >
            <Pencil size={20} color="#fff" />
          </motion.button>
        </>
      )}
    </nav>
  );
}

function NavTab({
  id, icon, label, active, badge,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: number;
}) {
  return (
    <button
      id={id}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 3, flex: 1, padding: '6px 0',
        background: 'transparent', border: 'none', cursor: 'default',
        position: 'relative', fontFamily: 'inherit',
      }}
    >
      {/* Badge */}
      {badge != null && (
        <span style={{
          position: 'absolute', top: 2, right: 'calc(50% - 18px)',
          minWidth: 18, height: 18, borderRadius: 9,
          background: '#1a73e8', color: '#fff',
          fontSize: '0.62rem', fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 4px',
        }}>
          {badge}
        </span>
      )}
      <span style={{ color: active ? '#4285f4' : '#484f58' }}>{icon}</span>
      <span style={{
        fontSize: '0.62rem', fontWeight: active ? 700 : 400,
        color: active ? '#4285f4' : '#484f58',
      }}>
        {label}
      </span>
    </button>
  );
}
