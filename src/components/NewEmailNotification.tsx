'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { EMAILS } from '@/lib/data';
import { Mail, X } from 'lucide-react';

export default function NewEmailNotification() {
  const { latestEmailId, dismissNotification, selectEmail } = useApp();

  const email = latestEmailId ? EMAILS.find(e => e.id === latestEmailId) : null;

  return (
    <>
      {/* Inline responsive styles so the toast works on all screen sizes */}
      <style>{`
        #new-email-notification {
          position: fixed;
          bottom: 24px;
          right: 24px;
          left: auto;
          width: 360px;
          max-width: calc(100vw - 32px);
          z-index: 200;
        }

        @media (max-width: 768px) {
          #new-email-notification {
            /* On mobile, sit just above the bottom nav (60px) */
            bottom: calc(68px + env(safe-area-inset-bottom, 0px));
            left: 16px;
            right: 16px;
            width: auto;
          }
        }

        @media (max-width: 480px) {
          #new-email-notification {
            bottom: calc(68px + env(safe-area-inset-bottom, 0px));
            left: 12px;
            right: 12px;
          }
        }
      `}</style>

      <AnimatePresence>
        {email && (
          <motion.div
            id="new-email-notification"
            style={{
              padding: '14px 16px',
              borderRadius: 12,
              background: 'rgba(22,27,34,0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(66,133,244,0.3)',
              boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(66,133,244,0.1)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              overflow: 'hidden',
            }}
            initial={{ y: 80, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            onClick={() => {
              selectEmail(email);
              dismissNotification();
            }}
          >
            {/* Colored icon */}
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: `linear-gradient(135deg, ${email.fromColor}, ${email.fromColor}bb)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              boxShadow: `0 4px 12px ${email.fromColor}44`,
            }}>
              <Mail size={17} color="#fff" />
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{
                  fontSize: '0.67rem', fontWeight: 700,
                  color: '#4285f4', textTransform: 'uppercase', letterSpacing: '0.07em',
                }}>
                  Nuevo correo
                </span>
                <span style={{ fontSize: '0.65rem', color: '#484f58' }}>{email.time}</span>
              </div>
              <p style={{
                fontSize: '0.84rem', fontWeight: 700,
                color: '#e6edf3', marginBottom: 2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {email.from}
              </p>
              <p style={{
                fontSize: '0.78rem', color: '#8b949e',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {email.subject}
              </p>
            </div>

            {/* Dismiss button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismissNotification();
              }}
              style={{
                width: 26, height: 26, borderRadius: 7,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(48,54,61,0.5)',
                border: 'none', cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <X size={13} color="#8b949e" />
            </button>

            {/* Auto-dismiss progress bar */}
            <motion.div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: 2, background: '#4285f4', borderRadius: '0 0 12px 12px',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 4.5, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
