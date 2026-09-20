'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '@/context/AppContext';
import { EMAILS, Email } from '@/lib/data';
import { Star, Paperclip, RefreshCw } from 'lucide-react';
import { useState } from 'react';

function EmailRow({ email, index }: { email: Email; index: number }) {
  const { selectEmail, readEmailIds } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const isRead = readEmailIds.has(email.id);

  return (
    <motion.div
      id={`email-row-${email.id}`}
      initial={{ x: -40, opacity: 0, height: 0 }}
      animate={{ x: 0, opacity: 1, height: 'auto' }}
      transition={{
        x: { duration: 0.35, ease: 'easeOut' },
        opacity: { duration: 0.35 },
        height: { duration: 0.3 },
      }}
      onClick={() => selectEmail(email)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 20px',
        cursor: 'pointer',
        background: isHovered
          ? 'rgba(26,115,232,0.06)'
          : isRead
            ? 'transparent'
            : 'rgba(26,115,232,0.03)',
        borderBottom: '1px solid rgba(48,54,61,0.3)',
        transition: 'background 0.15s',
        position: 'relative',
      }}
    >
      {/* Unread indicator */}
      {!isRead && (
        <div style={{
          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
          width: 3, height: '60%', borderRadius: '0 4px 4px 0',
          background: '#4285f4',
        }} />
      )}

      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: `linear-gradient(135deg, ${email.fromColor}, ${email.fromColor}cc)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        fontSize: '0.68rem', fontWeight: 700, color: '#fff',
        boxShadow: `0 2px 8px ${email.fromColor}33`,
      }}>
        {email.fromAvatar}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 2 }}>
          <span style={{
            fontSize: '0.82rem',
            fontWeight: isRead ? 400 : 700,
            color: isRead ? '#8b949e' : '#e6edf3',
            whiteSpace: 'nowrap',
          }}>
            {email.from}
          </span>
          <span style={{
            fontSize: '0.7rem',
            color: '#484f58',
            whiteSpace: 'nowrap',
          }}>
            {email.fromRole}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{
            fontSize: '0.82rem',
            fontWeight: isRead ? 400 : 600,
            color: isRead ? '#8b949e' : '#e6edf3',
            whiteSpace: 'nowrap',
          }}>
            {email.subject}
          </span>
          <span style={{
            fontSize: '0.78rem',
            color: '#484f58',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            — {email.preview}
          </span>
        </div>
      </div>

      {/* Star */}
      <Star
        size={16}
        color={email.starred ? '#fbbc04' : '#30363d'}
        fill={email.starred ? '#fbbc04' : 'none'}
        style={{ flexShrink: 0 }}
      />

      {/* Time */}
      <span style={{
        fontSize: '0.72rem',
        fontWeight: isRead ? 400 : 600,
        color: isRead ? '#484f58' : '#4285f4',
        whiteSpace: 'nowrap',
        minWidth: 55,
        textAlign: 'right',
      }}>
        {email.time}
      </span>
    </motion.div>
  );
}

function LoadingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: '20px',
        color: '#484f58',
        fontSize: '0.78rem',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      >
        <RefreshCw size={14} color="#4285f4" />
      </motion.div>
      <span>Sincronizando correos nuevos...</span>
    </motion.div>
  );
}

export default function EmailList() {
  const { visibleEmailIds, allEmailsLoaded } = useApp();

  // Get the visible emails in the correct order (newest first for display)
  const visibleEmails = EMAILS.filter(e => visibleEmailIds.includes(e.id));
  const displayEmails = [...visibleEmails].reverse();

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      background: '#0d1117',
    }}>
      {/* Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        borderBottom: '1px solid rgba(48,54,61,0.4)',
        gap: 12,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <input type="checkbox" disabled style={{ accentColor: '#4285f4', cursor: 'default' }} />
          <span style={{ fontSize: '0.75rem', color: '#484f58' }}>Seleccionar todo</span>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: '0.72rem', color: '#484f58' }}>
          {visibleEmails.length} de {EMAILS.length} correos
        </span>
      </div>

      {/* Email rows */}
      <AnimatePresence mode="popLayout">
        {displayEmails.map((email, i) => (
          <EmailRow key={email.id} email={email} index={i} />
        ))}
      </AnimatePresence>

      {/* Loading indicator */}
      <AnimatePresence>
        {!allEmailsLoaded && <LoadingIndicator />}
      </AnimatePresence>

      {/* Empty state */}
      {visibleEmails.length === 0 && !allEmailsLoaded && (
        <motion.div
          style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '80px 20px', gap: 12,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw size={28} color="#4285f4" />
          </motion.div>
          <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>Conectando a tu bandeja de entrada...</p>
          <p style={{ color: '#484f58', fontSize: '0.75rem' }}>Los correos empezarán a llegar en un momento</p>
        </motion.div>
      )}
    </div>
  );
}
