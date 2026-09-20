'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { EMAILS } from '@/lib/data';
import { Mail, X } from 'lucide-react';

export default function NewEmailNotification() {
  const { latestEmailId, dismissNotification, selectEmail } = useApp();

  const email = latestEmailId ? EMAILS.find(e => e.id === latestEmailId) : null;

  return (
    <AnimatePresence>
      {email && (
        <motion.div
          id="new-email-notification"
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 100,
            width: 360,
            padding: '14px 16px',
            borderRadius: 12,
            background: 'rgba(22,27,34,0.95)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(66,133,244,0.3)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(66,133,244,0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}
          initial={{ y: 80, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => {
            selectEmail(email);
            dismissNotification();
          }}
        >
          {/* Icon */}
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: `linear-gradient(135deg, ${email.fromColor}, ${email.fromColor}cc)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Mail size={16} color="#fff" />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#4285f4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Nuevo correo
              </span>
              <span style={{ fontSize: '0.65rem', color: '#484f58' }}>{email.time}</span>
            </div>
            <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e6edf3', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {email.from}
            </p>
            <p style={{ fontSize: '0.78rem', color: '#8b949e', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {email.subject}
            </p>
          </div>

          {/* Close */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              dismissNotification();
            }}
            style={{
              width: 24, height: 24, borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(48,54,61,0.4)',
              border: 'none', cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <X size={12} color="#8b949e" />
          </button>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 2, background: '#4285f4', borderRadius: '0 0 12px 12px',
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 4, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
